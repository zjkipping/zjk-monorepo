import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable, combineLatest, filter, map } from 'rxjs';

import { AniListMediaListService } from '@zjk/ani-list/data-access-media-list';
import { AniListUserInfoService } from '@zjk/ani-list/data-access-user-info';
import {
  AniListUserInfo,
  AniListMedia,
  AniListMediaStatus,
} from '@zjk/ani-list/util-types';
import { AniWatchingUiMediaListDisplayComponent } from '@zjk/ani-watching/ui-media-list-display';

@Component({
  selector: 'zjk-ani-watching-feature-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AniWatchingUiMediaListDisplayComponent,
    RouterLink,
  ],
  templateUrl: './ani-watching-feature-dashboard.component.html',
})
export class AniWatchingFeatureDashboardComponent {
  userInfo: Observable<AniListUserInfo>;
  airingMediaList: Observable<AniListMedia[]>;
  finishedAiringMediaList: Observable<AniListMedia[]>;
  plannedNowAiringMediaList: Observable<AniListMedia[]>;
  hasPlannedMediaNowAiring: Observable<boolean>;
  isLoadingWatching: Observable<boolean>;
  disableRefresh: Observable<boolean>;
  disableEpisodeProgressChanges = false;

  constructor(
    private mediaListService: AniListMediaListService,
    userInfoService: AniListUserInfoService,
  ) {
    this.userInfo = userInfoService.userInfo;
    this.isLoadingWatching = mediaListService.currentlyWatching.pipe(
      map((mediaList) => !mediaList),
    );
    const isLoadingPlanning = mediaListService.planningToWatch.pipe(
      map((mediaList) => !mediaList),
    );
    this.disableRefresh = combineLatest([
      this.isLoadingWatching,
      isLoadingPlanning,
    ]).pipe(
      map(
        ([loadingWatching, loadingPlanning]) =>
          loadingWatching || loadingPlanning,
      ),
    );

    const loadedMediaList = mediaListService.currentlyWatching.pipe(
      filter((mediaList): mediaList is AniListMedia[] => !!mediaList),
    );

    this.airingMediaList = loadedMediaList.pipe(
      map((mediaList) =>
        mediaList
          .filter(
            (mediaItem) => mediaItem.status === AniListMediaStatus.RELEASING,
          )
          .sort((a, b) => {
            const aTime = a.nextAiringEpisode?.timeUntilAiring as number;
            const bTime = b.nextAiringEpisode?.timeUntilAiring as number;
            if (aTime > bTime) {
              return 1;
            } else if (aTime < bTime) {
              return -1;
            } else {
              return 0;
            }
          }),
      ),
    );

    this.finishedAiringMediaList = loadedMediaList.pipe(
      map((mediaList) =>
        mediaList
          .filter(
            (mediaItem) => mediaItem.status === AniListMediaStatus.FINISHED,
          )
          .sort((a, b) => {
            const aDate = new Date();
            aDate.setFullYear(a.endDate.year);
            aDate.setMonth(a.endDate.month - 1);
            aDate.setDate(a.endDate.day);
            const bDate = new Date();
            bDate.setFullYear(b.endDate.year);
            bDate.setMonth(b.endDate.month - 1);
            bDate.setDate(b.endDate.day);
            if (aDate > bDate) {
              return -1;
            } else if (aDate < bDate) {
              return 1;
            } else {
              return 0;
            }
          }),
      ),
    );

    this.plannedNowAiringMediaList = mediaListService.planningToWatch.pipe(
      filter((mediaList): mediaList is AniListMedia[] => !!mediaList),
      map((mediaList) =>
        mediaList.filter(
          (mediaItem) => mediaItem.status === AniListMediaStatus.RELEASING,
        ),
      ),
    );

    this.hasPlannedMediaNowAiring = this.plannedNowAiringMediaList.pipe(
      map((mediaList) => mediaList.length > 0),
    );
  }

  refresh() {
    this.mediaListService.fetchCurrentWatching();
    this.mediaListService.fetchPlanningToWatch();
  }

  async increaseEpisodeProgress(media: AniListMedia) {
    const newProgress = media.progress + 1;
    if (newProgress <= media.episodes) {
      this.disableEpisodeProgressChanges = true;
      await this.mediaListService.updateEpisodeProgress(
        media.mediaListId,
        newProgress,
      );
      this.disableEpisodeProgressChanges = false;
    }
  }

  async decreaseEpisodeProgress(media: AniListMedia) {
    const newProgress = media.progress - 1;
    if (newProgress >= 0) {
      this.disableEpisodeProgressChanges = true;
      await this.mediaListService.updateEpisodeProgress(
        media.mediaListId,
        newProgress,
      );
      this.disableEpisodeProgressChanges = false;
    }
  }
}
