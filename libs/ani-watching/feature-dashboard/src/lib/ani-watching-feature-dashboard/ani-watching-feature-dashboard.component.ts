import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable, filter, map } from 'rxjs';

import { AniListMediaListService } from '@zjk/ani-list/data-access-media-list';
import { AniListMedia, AniListMediaStatus } from '@zjk/ani-list/util-types';
import { AniWatchingUiMediaListDisplayComponent } from '@zjk/ani-watching/ui-media-list-display';

const localStorageIgnoredMediaIdsKey = 'ignored-media-ids';

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
  airingMediaList: Observable<AniListMedia[]>;
  isLoadingWatching: Observable<boolean>;
  displayAiringMediaList: Observable<boolean>;
  finishedAiringMediaList: Observable<AniListMedia[]>;
  displayFinishedAiringMediaList: Observable<boolean>;
  plannedNowAiringMediaList: Observable<AniListMedia[]>;
  hasPlannedMediaNowAiring: Observable<boolean>;
  disableEpisodeProgressChanges = false;

  constructor(private mediaListService: AniListMediaListService) {
    this.isLoadingWatching = mediaListService.currentlyWatching.pipe(
      map((mediaList) => !mediaList),
    );

    const loadedMediaList = mediaListService.currentlyWatching.pipe(
      filter((mediaList): mediaList is AniListMedia[] => !!mediaList),
    );

    const airingFilteredList = loadedMediaList.pipe(
      map((mediaList) =>
        mediaList.filter(
          (mediaItem) => mediaItem.status === AniListMediaStatus.RELEASING,
        ),
      ),
    );

    this.displayAiringMediaList = airingFilteredList.pipe(
      map((mediaList) => mediaList.length > 0),
    );

    this.airingMediaList = airingFilteredList.pipe(
      map((mediaList) =>
        mediaList.sort((a, b) => {
          const aTime = a.nextAiringEpisode?.timeUntilAiring as number;
          const bTime = b.nextAiringEpisode?.timeUntilAiring as number;
          if (!aTime) {
            return 1;
          }
          if (!bTime) {
            return -1;
          }
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

    const finishedAiringFilteredList = loadedMediaList.pipe(
      map((mediaList) =>
        mediaList.filter(
          (mediaItem) => mediaItem.status === AniListMediaStatus.FINISHED,
        ),
      ),
    );

    this.displayFinishedAiringMediaList = finishedAiringFilteredList.pipe(
      map((mediaList) => mediaList.length > 0),
    );

    this.finishedAiringMediaList = finishedAiringFilteredList.pipe(
      map((mediaList) =>
        mediaList.sort((a, b) => {
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
      map((mediaList) => {
        const ignoredIds: number[] = JSON.parse(
          localStorage.getItem(localStorageIgnoredMediaIdsKey) ?? '[]',
        );
        const filtered = mediaList.filter(
          (mediaItem) =>
            !ignoredIds.some(
              (ignoredId) => ignoredId === mediaItem.mediaListId,
            ),
        );
        console.log({ ignoredIds, mediaList, filtered });
        return filtered;
      }),
      map((mediaList) => mediaList.length > 0),
    );
  }

  async increaseEpisodeProgress(media: AniListMedia) {
    const newProgress = media.progress + 1;
    if (
      (media.episodes && media.episodes >= newProgress) ||
      (media.nextAiringEpisode &&
        media.nextAiringEpisode.episode - 1 >= newProgress)
    ) {
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
