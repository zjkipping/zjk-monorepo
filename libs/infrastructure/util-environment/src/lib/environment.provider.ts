import { InjectionToken, Provider } from '@angular/core';

export const ENVIRONMENT = new InjectionToken<unknown>('APP_ENVIRONMENT_TOKEN');

export function provideEnvironment(environment: unknown): Provider {
  return {
    provide: ENVIRONMENT,
    useValue: environment,
  };
}
