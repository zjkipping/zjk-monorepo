import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

import {
  AniListMediaListService,
  Media,
  MediaStatus,
} from '@zjk/ani-list/data-access-media-list';
import {
  AniListUserInfo,
  AniListUserInfoService,
} from '@zjk/ani-list/data-access-user-info';

import { TimeUntilPipe } from './time-until.pipe';

@Component({
  selector: 'zjk-ani-watching-feature-dashboard',
  standalone: true,
  imports: [CommonModule, TimeUntilPipe],
  templateUrl: './ani-watching-feature-dashboard.component.html',
  styleUrls: ['./ani-watching-feature-dashboard.component.scss'],
})
export class AniWatchingFeatureDashboardComponent {
  userInfo: Observable<AniListUserInfo>;
  airingMediaList: Observable<Media[]>;
  finishedAiringMediaList: Observable<Media[]>;
  isLoadingWatching: Observable<boolean>;
  isLoadingPlanning: Observable<boolean>;

  constructor(
    userInfoService: AniListUserInfoService,
    private mediaListService: AniListMediaListService,
  ) {
    this.userInfo = userInfoService.userInfo;
    this.isLoadingWatching = mediaListService.currentlyWatching.pipe(
      map((mediaList) => !mediaList),
    );
    this.isLoadingPlanning = mediaListService.planningToWatch.pipe(
      map((mediaList) => !mediaList),
    );

    const loadedMediaList = mediaListService.currentlyWatching.pipe(
      filter((mediaList): mediaList is Media[] => !!mediaList),
    );

    this.airingMediaList = loadedMediaList.pipe(
      map((mediaList) =>
        mediaList
          .filter((mediaItem) => mediaItem.status === MediaStatus.RELEASING)
          .sort((a, b) => {
            const aTime = a.nextAiringEpisode.timeUntilAiring;
            const bTime = b.nextAiringEpisode.timeUntilAiring;
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
          .filter((mediaItem) => mediaItem.status === MediaStatus.FINISHED)
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
  }

  refresh() {
    this.mediaListService.refreshCurrentlyWatching();
  }

  async increaseEpisodeProgress(media: Media) {
    const newProgress = media.progress + 1;
    if (newProgress <= media.episodes) {
      await this.mediaListService.updateEpisodeProgress(
        media.mediaListId,
        newProgress,
      );
      this.mediaListService.refreshCurrentlyWatching();
    }
  }

  async decreaseEpisodeProgress(media: Media) {
    const newProgress = media.progress - 1;
    if (newProgress >= 0) {
      await this.mediaListService.updateEpisodeProgress(
        media.mediaListId,
        newProgress,
      );
      this.mediaListService.refreshCurrentlyWatching();
    }
  }
}
