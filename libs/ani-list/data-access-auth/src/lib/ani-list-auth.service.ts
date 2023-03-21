import { DOCUMENT } from '@angular/common';
import { Injectable, Inject } from '@angular/core';

import { AniListEnvironment } from '@zjk/ani-list/util-environment';
import { EnvironmentService } from '@zjk/infrastructure/util-environment';

@Injectable({
  providedIn: 'root',
})
export class AniListAuthService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private es: EnvironmentService<AniListEnvironment>,
  ) {}

  login() {
    const clientId = this.es.environment.aniListClientId;
    const loginUrl = new URL(
      `/api/v2/oauth/authorize?client_id=${clientId}&response_type=token`,
      'https://anilist.co',
    );
    this.document.location = loginUrl.toString();
  }
}
