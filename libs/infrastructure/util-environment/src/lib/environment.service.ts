import { Injectable, Inject } from '@angular/core';

import { ENVIRONMENT } from './environment.provider';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService<T> {
  constructor(@Inject(ENVIRONMENT) public environment: T) {}
}
