import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AniListMedia } from '@zjk/ani-list/util-types';

import { TimeUntilPipe } from './time-until.pipe';

@Component({
  selector: 'zjk-ani-watching-ui-media-list-display',
  standalone: true,
  imports: [CommonModule, TimeUntilPipe],
  templateUrl: './ani-watching-ui-media-list-display.component.html',
  styleUrls: ['./ani-watching-ui-media-list-display.component.scss'],
})
export class AniWatchingUiMediaListDisplayComponent {
  @Input() mediaList: AniListMedia[] = [];

  @Output() increaseEpisodeProgress = new EventEmitter<AniListMedia>();
  @Output() decreaseEpisodeProgress = new EventEmitter<AniListMedia>();
}
