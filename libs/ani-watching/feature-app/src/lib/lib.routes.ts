import { Route } from '@angular/router';

export const aniWatchingFeatureAppRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'login',
    loadComponent: () => import(''),
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
