import { Route } from '@angular/router';

import { AniListAuthGuard } from '@zjk/ani-list/data-access-auth-guard';
import { setLoginRedirectData } from '@zjk/ani-list/feature-login-redirect';
import { AniWatchingFeatureAuthenticatedShellComponent } from '@zjk/ani-watching/feature-authenticated-shell';

export const aniWatchingFeatureAppRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'login-redirect',
    loadComponent: () =>
      import('@zjk/ani-list/feature-login-redirect').then(
        (m) => m.AniListFeatureLoginRedirectComponent,
      ),
    data: setLoginRedirectData({ redirectTo: 'dashboard' }),
  },
  {
    path: 'dashboard',
    component: AniWatchingFeatureAuthenticatedShellComponent,
    canMatch: [AniListAuthGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@zjk/ani-watching/feature-dashboard').then(
            (m) => m.AniWatchingFeatureDashboardComponent,
          ),
      },
      {
        path: 'planned-airing-converter',
        loadComponent: () =>
          import('@zjk/ani-watching/feature-planned-airing-converter').then(
            (m) => m.AniWatchingFeaturePlannedAiringConverterComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
