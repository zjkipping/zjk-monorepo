import { DOCUMENT } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { AniListEnvironment } from '@zjk/ani-list/util-environment';
import { EnvironmentService } from '@zjk/infrastructure/util-environment';

interface ImplicitGrantUrlFragments {
  access_token: string;
  token_type: string;
  expires_in: string;
}

@Injectable({
  providedIn: 'root',
})
export class AniListAuthService {
  public accessToken: string | null = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private es: EnvironmentService<AniListEnvironment>,
    private router: Router,
  ) {}

  hasAuth() {
    return !!this.accessToken;
  }

  login() {
    const clientId = this.es.environment.aniListClientId;
    const loginUrl = new URL('https://anilist.co/api/v2/oauth/authorize');
    loginUrl.searchParams.append('client_id', clientId);
    loginUrl.searchParams.append('response_type', 'token');
    this.document.location = loginUrl.href;
  }

  consumeRedirectToken(redirectTo: string) {
    const implicitGrant: ImplicitGrantUrlFragments = this.document.location.hash
      .substring(1)
      .split('&')
      .reduce((prev, curr) => {
        const parts = curr.split('=');
        return {
          ...prev,
          [parts[0]]: parts[1],
        };
      }, {} as ImplicitGrantUrlFragments);

    this.accessToken = implicitGrant.access_token;
    this.router.navigate([redirectTo]);
  }

  logout() {
    this.accessToken = null;
  }
}
