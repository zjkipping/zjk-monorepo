import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { AniListAuthService } from '@zjk/ani-list/data-access-auth';

@Component({
  selector: 'zjk-ani-list-feature-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ani-list-feature-login.component.html',
  styleUrls: ['./ani-list-feature-login.component.scss'],
})
export class AniListFeatureLoginComponent {
  constructor(aniListAuth: AniListAuthService) {
    aniListAuth.login();
  }
}
