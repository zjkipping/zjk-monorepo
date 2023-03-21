import { Route } from '@angular/router';

import { AniListAuthGuard } from '@zjk/ani-list/data-access-auth-guard';
import { setLoginRedirectData } from '@zjk/ani-list/feature-login-redirect';

export const aniWatchingFeatureAppRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@zjk/ani-list/feature-login').then(
        (m) => m.AniListFeatureLoginComponent,
      ),
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
    canMatch: [AniListAuthGuard('login')],
    loadComponent: () =>
      import('@zjk/ani-watching/feature-dashboard').then(
        (m) => m.AniWatchingFeatureDashboardComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
