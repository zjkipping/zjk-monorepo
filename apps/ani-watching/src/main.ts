import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';

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
    provideEnvironment(environment),
  ],
}).catch((err) => console.error(err));
