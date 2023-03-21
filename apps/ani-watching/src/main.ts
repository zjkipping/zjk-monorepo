import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';

import {
  AniWatchingFeatureAppComponent,
  aniWatchingFeatureAppRoutes,
} from '@zjk/ani-watching/feature-app';

bootstrapApplication(AniWatchingFeatureAppComponent, {
  providers: [
    provideRouter(
      aniWatchingFeatureAppRoutes,
      withEnabledBlockingInitialNavigation(),
    ),
  ],
}).catch((err) => console.error(err));
