import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AniListAuthService } from '@zjk/ani-list/data-access-auth';

export function AniListAuthHttpInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const aniListAuthService = inject(AniListAuthService);
  const accessToken = aniListAuthService.accessToken;
  if (req.url.includes('graphql.anilist.co') && accessToken) {
    return next(
      req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
      }),
    );
  } else {
    return next(req);
  }
}
