import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  expand,
  reduce,
  shareReplay,
  startWith,
  switchMap,
  takeWhile,
  firstValueFrom,
  of,
  merge,
} from 'rxjs';

import { AniListGraphQLApiService } from '@zjk/ani-list/data-access-graphql-api';
import { AniListUserInfoService } from '@zjk/ani-list/data-access-user-info';

import {
  PaginatedMediaListQuery,
  paginatedMediaListQuery,
  updateEpisodeProgressQuery,
} from './graphql-queries';
import { Media, MediaListStatus } from './types';

@Injectable({
  providedIn: 'root',
})
export class AniListMediaListService {
  currentlyWatching: Observable<Media[] | null>;
  planningToWatch: Observable<Media[] | null>;

  private _refreshCurrentlyWatching = new Subject<void>();
  private _refreshPlanningToWatch = new Subject<void>();

  constructor(
    private aniListGraphQLApiService: AniListGraphQLApiService,
    private aniListUserInfoService: AniListUserInfoService,
  ) {
    this.currentlyWatching = this.aniListUserInfoService.userInfo.pipe(
      switchMap((userInfo) =>
        this._refreshCurrentlyWatching.pipe(
          startWith(null),
          switchMap(() =>
            merge(
              of(null),
              this.getAllMediaListPages(userInfo.id, [
                MediaListStatus.CURRENT,
                MediaListStatus.REPEATING,
              ]),
            ),
          ),
        ),
      ),
      shareReplay(1),
    );

    this.planningToWatch = this.aniListUserInfoService.userInfo.pipe(
      switchMap((userInfo) =>
        this._refreshPlanningToWatch.pipe(
          startWith(null),
          switchMap(() =>
            merge(
              of(null),
              this.getAllMediaListPages(userInfo.id, [
                MediaListStatus.PLANNING,
              ]),
            ),
          ),
        ),
      ),
      shareReplay(1),
    );
  }

  private getAllMediaListPages(
    userId: number,
    mediaListStatuses: MediaListStatus[],
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
          })),
        ],
        [] as Media[],
      ),
    );
  }

  private fetchMediaListPage(
    pageNumber: number,
    userId: number,
    mediaListStatuses: MediaListStatus[],
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

  refreshCurrentlyWatching() {
    this._refreshCurrentlyWatching.next();
  }

  refreshPlanningToWatch() {
    this._refreshPlanningToWatch.next();
  }

  async updateEpisodeProgress(mediaListId: number, newProgress: number) {
    return firstValueFrom(
      this.aniListGraphQLApiService.sendQuery<void>(
        updateEpisodeProgressQuery,
        {
          mediaListId,
          progress: newProgress,
        },
      ),
    );
  }
}
