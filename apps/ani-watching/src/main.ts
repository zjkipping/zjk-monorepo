import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';

import { provideAniListAuthHttpInterceptor } from '@zjk/ani-list/data-access-http-interceptor';
import {
  AniWatchingFeatureAppComponent,
  aniWatchingFeatureAppRoutes,
} from '@zjk/ani-watching/feature-app';
import { provideEnvironment } from '@zjk/infrastructure/util-environment';

import { environment } from './environments/environment';

bootstrapApplication(AniWatchingFeatureAppComponent, {
  providers: [
    provideRouter(
      aniWatchingFeatureAppRoutes,
      withEnabledBlockingInitialNavigation(),
    ),
    provideHttpClient(),
    provideEnvironment(environment),
    provideAniListAuthHttpInterceptor(),
  ],
}).catch((err) => console.error(err));
