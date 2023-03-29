import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, map, combineLatest } from 'rxjs';

import { AniListMediaListService } from '@zjk/ani-list/data-access-media-list';
import { AniListUserInfoService } from '@zjk/ani-list/data-access-user-info';
import { AniListUserInfo } from '@zjk/ani-list/util-types';
import { AniWatchingUiNavbarComponent } from '@zjk/ani-watching/ui-navbar';

@Component({
  selector: 'zjk-ani-watching-feature-authenticated-shell',
  standalone: true,
  imports: [CommonModule, RouterModule, AniWatchingUiNavbarComponent],
  templateUrl: './ani-watching-feature-authenticated-shell.component.html',
  styleUrls: ['./ani-watching-feature-authenticated-shell.component.scss'],
})
export class AniWatchingFeatureAuthenticatedShellComponent {
  userInfo: Observable<AniListUserInfo>;
  disableRefresh: Observable<boolean>;

  constructor(
    private mediaListService: AniListMediaListService,
    userInfoService: AniListUserInfoService,
  ) {
    this.userInfo = userInfoService.userInfo;
    const isLoadingWatching = mediaListService.currentlyWatching.pipe(
      map((mediaList) => !mediaList),
    );
    const isLoadingPlanning = mediaListService.planningToWatch.pipe(
      map((mediaList) => !mediaList),
    );
    this.disableRefresh = combineLatest([
      isLoadingWatching,
      isLoadingPlanning,
    ]).pipe(
      map(
        ([loadingWatching, loadingPlanning]) =>
          loadingWatching || loadingPlanning,
      ),
    );
  }

  refresh() {
    this.mediaListService.fetchCurrentWatching();
    this.mediaListService.fetchPlanningToWatch();
  }
}
