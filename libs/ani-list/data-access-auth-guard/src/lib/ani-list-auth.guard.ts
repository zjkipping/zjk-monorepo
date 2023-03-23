import { inject } from '@angular/core';

import { AniListAuthService } from '@zjk/ani-list/data-access-auth';

export function AniListAuthGuard() {
  const aniListAuthService = inject(AniListAuthService);
  if (aniListAuthService.hasAuth()) {
    return true;
  } else {
    return aniListAuthService.login();
  }
}
