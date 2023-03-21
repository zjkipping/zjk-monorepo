import { Route } from '@angular/router';

export const aniWatchingFeatureAppRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@zjk/ani-list/feature-login').then(
        (m) => m.AniListFeatureLoginComponent,
      ),
  },
  {
    path: 'home',
    loadComponent: () => import(''),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
