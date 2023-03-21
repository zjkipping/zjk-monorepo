import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AniListAuthService } from '@zjk/ani-list/data-access-auth';

export function provideAniListAuthHttpInterceptor() {
  return {
    provide: HTTP_INTERCEPTORS,
    useClass: AniListAuthHttpInterceptor,
    multi: true,
  };
}

@Injectable()
export class AniListAuthHttpInterceptor implements HttpInterceptor {
  constructor(private aniListAuthService: AniListAuthService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (
      req.url.includes('graphql.anilist.co') &&
      this.aniListAuthService.accessToken
    ) {
      req.headers.append(
        'Authorization',
        `Bear ${this.aniListAuthService.accessToken}`,
      );
    }

    return next.handle(req);
  }
}
