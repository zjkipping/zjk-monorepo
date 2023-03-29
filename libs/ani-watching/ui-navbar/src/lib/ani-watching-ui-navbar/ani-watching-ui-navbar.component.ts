import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AniListUserInfo } from '@zjk/ani-list/util-types';

@Component({
  selector: 'zjk-ani-watching-ui-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ani-watching-ui-navbar.component.html',
  styleUrls: ['./ani-watching-ui-navbar.component.scss'],
})
export class AniWatchingUiNavbarComponent {
  @Input() userInfo?: AniListUserInfo;
  @Input() disableRefreshButton = false;
  @Output() refreshClicked = new EventEmitter<void>();
}
