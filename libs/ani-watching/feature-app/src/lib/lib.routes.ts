import { Route } from '@angular/router';

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
    path: 'dashboard',
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
