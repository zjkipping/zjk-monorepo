import { Injectable } from '@angular/core';
import {
  expand,
  reduce,
  takeWhile,
  firstValueFrom,
  BehaviorSubject,
} from 'rxjs';

import { AniListGraphQLApiService } from '@zjk/ani-list/data-access-graphql-api';
import { AniListUserInfoService } from '@zjk/ani-list/data-access-user-info';
import { AniListMedia, AniListMediaListStatus } from '@zjk/ani-list/util-types';

const supportedExternalLinkSites = [
  'crunchyroll',
  'hidive',
  'netflix',
  'disney',
  'hulu',
];

import {
  PaginatedMediaListQuery,
  paginatedMediaListQuery,
  updateEpisodeProgressQuery,
  updateStatusQuery,
} from './graphql-queries';

@Injectable({
  providedIn: 'root',
})
export class AniListMediaListService {
  private _currentWatching = new BehaviorSubject<AniListMedia[] | null>(null);
  private _planningToWatch = new BehaviorSubject<AniListMedia[] | null>(null);
  currentlyWatching = this._currentWatching.asObservable();
  planningToWatch = this._planningToWatch.asObservable();

  constructor(
    private aniListGraphQLApiService: AniListGraphQLApiService,
    private aniListUserInfoService: AniListUserInfoService,
  ) {
    this.fetchCurrentWatching();
    this.fetchPlanningToWatch();
  }

  public async fetchCurrentWatching() {
    if (this._currentWatching.value !== null) {
      this._currentWatching.next(null);
    }

    const userInfo = await firstValueFrom(this.aniListUserInfoService.userInfo);

    const mediaList = await firstValueFrom(
      this.getAllMediaListPages(userInfo.id, [
        AniListMediaListStatus.CURRENT,
        AniListMediaListStatus.REPEATING,
      ]),
    );

    this._currentWatching.next(mediaList);
  }

  public async fetchPlanningToWatch() {
    if (this._planningToWatch.value !== null) {
      this._planningToWatch.next(null);
    }

    const userInfo = await firstValueFrom(this.aniListUserInfoService.userInfo);

    const mediaList = await firstValueFrom(
      this.getAllMediaListPages(userInfo.id, [AniListMediaListStatus.PLANNING]),
    );

    this._planningToWatch.next(mediaList);
  }

  async updateEpisodeProgress(mediaListId: number, newProgress: number) {
    try {
      await firstValueFrom(
        this.aniListGraphQLApiService.sendQuery<void>(
          updateEpisodeProgressQuery,
          {
            mediaListId,
            progress: newProgress,
          },
        ),
      );

      const mediaList = this._currentWatching.value as AniListMedia[];
      const index = mediaList.findIndex(
        (mediaItem) => mediaItem.mediaListId === mediaListId,
      );
      let updatedMediaList: AniListMedia[] = [];
      const oldItem = mediaList[index];
      if (newProgress === oldItem.episodes) {
        updatedMediaList = [
          ...mediaList.slice(0, index),
          ...mediaList.slice(index + 1),
        ];
      } else {
        updatedMediaList = [
          ...mediaList.slice(0, index),
          { ...oldItem, progress: newProgress },
          ...mediaList.slice(index + 1),
        ];
      }
      this._currentWatching.next(updatedMediaList);
    } catch (err) {
      console.error(err);
    }
  }

  async convertToWatching(mediaItems: AniListMedia[]) {
    const ids = mediaItems.map((mediaItem) => mediaItem.mediaListId);
    try {
      await firstValueFrom(
        this.aniListGraphQLApiService.sendQuery<void>(updateStatusQuery, {
          mediaListIds: ids,
        }),
      );

      const currentlyWatchingList = this._currentWatching
        .value as AniListMedia[];

      this._currentWatching.next([...currentlyWatchingList, ...mediaItems]);

      const planningToWatchList = this._planningToWatch.value as AniListMedia[];
      this._planningToWatch.next([
        ...planningToWatchList.filter(
          (planningMediaItem) =>
            !mediaItems.find(
              (mediaItem) =>
                mediaItem.mediaListId === planningMediaItem.mediaListId,
            ),
        ),
      ]);
    } catch (err) {
      console.error(err);
    }
  }

  private getAllMediaListPages(
    userId: number,
    mediaListStatuses: AniListMediaListStatus[],
  ) {
    return this.fetchMediaListPage(1, userId, mediaListStatuses).pipe(
      expand((response) =>
        this.fetchMediaListPage(
          response.data.Page.pageInfo.currentPage + 1,
          userId,
          mediaListStatuses,
        ),
      ),
      takeWhile((response) => response.data.Page.pageInfo.hasNextPage, true),
      reduce(
        (acc, curr) => [
          ...acc,
          ...curr.data.Page.mediaList.map((mediaListItem) => ({
            mediaListId: mediaListItem.id,
            progress: mediaListItem.progress,
            ...mediaListItem.media,
            externalLinks: mediaListItem.media.externalLinks.filter((link) => {
              const site = link.site.toLowerCase();
              return supportedExternalLinkSites.some((supportedSite) =>
                site.includes(supportedSite),
              );
            }),
          })),
        ],
        [] as AniListMedia[],
      ),
    );
  }

  private fetchMediaListPage(
    pageNumber: number,
    userId: number,
    mediaListStatuses: AniListMediaListStatus[],
  ) {
    return this.aniListGraphQLApiService.sendQuery<PaginatedMediaListQuery>(
      paginatedMediaListQuery,
      {
        pageNumber,
        userId,
        mediaListStatuses,
      },
    );
  }
}
