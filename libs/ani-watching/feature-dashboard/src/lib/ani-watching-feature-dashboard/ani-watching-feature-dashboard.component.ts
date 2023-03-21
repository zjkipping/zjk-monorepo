import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AniListMediaListService,
  Media,
} from '@zjk/ani-list/data-access-media-list';
import {
  AniListUserInfo,
  AniListUserInfoService,
} from '@zjk/ani-list/data-access-user-info';

@Component({
  selector: 'zjk-ani-watching-feature-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ani-watching-feature-dashboard.component.html',
  styleUrls: ['./ani-watching-feature-dashboard.component.scss'],
})
export class AniWatchingFeatureDashboardComponent {
  userInfo: Observable<AniListUserInfo>;
  currentlyWatchingList: Observable<Media[]>;
  planningToWatchList: Observable<Media[]>;

  constructor(
    userInfoService: AniListUserInfoService,
    mediaListService: AniListMediaListService,
  ) {
    this.userInfo = userInfoService.userInfo;
    this.currentlyWatchingList = mediaListService.currentlyWatching;
    this.planningToWatchList = mediaListService.planningToWatch;
  }
}
