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
import { AniListMedia, AniListMediaListStatus } from '@zjk/ani-list/util-types';

import {
  PaginatedMediaListQuery,
  paginatedMediaListQuery,
  updateEpisodeProgressQuery,
} from './graphql-queries';

@Injectable({
  providedIn: 'root',
})
export class AniListMediaListService {
  currentlyWatching: Observable<AniListMedia[] | null>;
  planningToWatch: Observable<AniListMedia[] | null>;

  private _refreshCurrentlyWatching = new Subject<void>();
  private _refreshPlanningToWatch = new Subject<void>();

  private _silentRefreshCurrentlyWatching = new Subject<void>();
  private _silentRefreshPlanningToWatch = new Subject<void>();

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
              this._silentRefreshCurrentlyWatching.pipe(
                startWith(null),
                switchMap(() =>
                  this.getAllMediaListPages(userInfo.id, [
                    AniListMediaListStatus.CURRENT,
                    AniListMediaListStatus.REPEATING,
                  ]),
                ),
              ),
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
              this._silentRefreshPlanningToWatch.pipe(
                startWith(null),
                switchMap(() =>
                  this.getAllMediaListPages(userInfo.id, [
                    AniListMediaListStatus.PLANNING,
                  ]),
                ),
              ),
            ),
          ),
        ),
      ),
      shareReplay(1),
    );
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

  refreshCurrentlyWatching() {
    this._refreshCurrentlyWatching.next();
  }

  refreshPlanningToWatch() {
    this._refreshPlanningToWatch.next();
  }

  silentRefreshCurrentlyWatching() {
    this._silentRefreshCurrentlyWatching.next();
  }

  silentRefreshPlanningToWatch() {
    this._silentRefreshPlanningToWatch.next();
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
