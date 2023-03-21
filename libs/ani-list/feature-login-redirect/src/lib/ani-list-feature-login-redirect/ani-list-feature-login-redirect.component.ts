import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AniListAuthService } from '@zjk/ani-list/data-access-auth';

import { AniListLoginRedirectRouteData } from '../route-data';

@Component({
  selector: 'zjk-ani-list-feature-login-redirect',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ani-list-feature-login-redirect.component.html',
  styleUrls: ['./ani-list-feature-login-redirect.component.scss'],
})
export class AniListFeatureLoginRedirectComponent {
  constructor(route: ActivatedRoute, aniListAuthService: AniListAuthService) {
    const loginRedirectData = route.snapshot
      .data as AniListLoginRedirectRouteData;

    aniListAuthService.consumeRedirectToken(loginRedirectData.redirectTo);
  }
}
