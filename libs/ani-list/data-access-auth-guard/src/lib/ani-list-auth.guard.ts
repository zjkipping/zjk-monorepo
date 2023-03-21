import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AniListAuthService } from '@zjk/ani-list/data-access-auth';

export const AniListAuthGuard = (redirectUrl: string) => () => {
  const aniListAuthService = inject(AniListAuthService);
  const router = inject(Router);
  if (aniListAuthService.hasAuth()) {
    return true;
  } else {
    return router.parseUrl(redirectUrl);
  }
};
