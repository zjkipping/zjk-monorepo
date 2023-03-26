import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AniListMedia } from '@zjk/ani-list/util-types';

import { TimeUntilPipe } from './time-until.pipe';

@Component({
  selector: 'zjk-ani-watching-ui-media-list-display',
  standalone: true,
  imports: [CommonModule, TimeUntilPipe],
  templateUrl: './ani-watching-ui-media-list-display.component.html',
})
export class AniWatchingUiMediaListDisplayComponent {
  @Input() mediaList: AniListMedia[] = [];
  @Input() disableEpisodeProgressChanges = false;

  @Output() increaseEpisodeProgress = new EventEmitter<AniListMedia>();
  @Output() decreaseEpisodeProgress = new EventEmitter<AniListMedia>();

  mediaListTrackBy(_index: number, item: AniListMedia) {
    return item.mediaListId;
  }
}
