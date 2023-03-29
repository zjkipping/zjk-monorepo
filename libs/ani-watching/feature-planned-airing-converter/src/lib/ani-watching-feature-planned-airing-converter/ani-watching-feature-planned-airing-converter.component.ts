import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, filter, map } from 'rxjs';

import { AniListMediaListService } from '@zjk/ani-list/data-access-media-list';
import { AniListMedia, AniListMediaStatus } from '@zjk/ani-list/util-types';

@Component({
  selector: 'zjk-ani-watching-feature-planned-airing-converter',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ani-watching-feature-planned-airing-converter.component.html',
  styleUrls: ['./ani-watching-feature-planned-airing-converter.component.scss'],
})
export class AniWatchingFeaturePlannedAiringConverterComponent {
  plannedNowAiringMediaList: Observable<AniListMedia[]>;
  isLoading: Observable<boolean>;
  selectedMediaListitems: AniListMedia[] = [];
  disableSubmit = false;

  constructor(private mediaListService: AniListMediaListService) {
    this.isLoading = mediaListService.planningToWatch.pipe(
      map((mediaList) => !mediaList),
    );

    this.plannedNowAiringMediaList = mediaListService.planningToWatch.pipe(
      filter((mediaList): mediaList is AniListMedia[] => !!mediaList),
      map((mediaList) =>
        mediaList.filter(
          (mediaItem) => mediaItem.status === AniListMediaStatus.RELEASING,
        ),
      ),
    );
  }

  mediaListTrackBy(_index: number, item: AniListMedia) {
    return item.mediaListId;
  }

  selectMedia(media: AniListMedia) {
    const index = this.selectedMediaListitems.findIndex(
      (mediaItem) => mediaItem.mediaListId === media.mediaListId,
    );
    if (index >= 0) {
      this.selectedMediaListitems = [
        ...this.selectedMediaListitems.slice(0, index),
        ...this.selectedMediaListitems.slice(index + 1),
      ];
    } else {
      this.selectedMediaListitems = [...this.selectedMediaListitems, media];
    }
  }

  isSelected(id: number) {
    return !!this.selectedMediaListitems.find(
      (mediaItem) => mediaItem.mediaListId === id,
    );
  }

  async convertSelectedToWatching() {
    this.disableSubmit = true;
    await this.mediaListService.convertToWatching(this.selectedMediaListitems);
    this.selectedMediaListitems = [];
    this.disableSubmit = false;
  }
}
