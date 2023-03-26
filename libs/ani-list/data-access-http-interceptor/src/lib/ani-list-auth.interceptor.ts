import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

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
    ).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          aniListAuthService.login();
        }
        return of(err);
      }),
    );
  } else {
    return next(req);
  }
}
