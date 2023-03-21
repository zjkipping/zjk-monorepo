import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const aniListGraphQLUrl = 'https://graphql.anilist.co';

@Injectable({ providedIn: 'root' })
export class AniListGraphQLApiService {
  constructor(private http: HttpClient) {}

  sendQuery<T>(query: string, variables?: Record<string, unknown>) {
    return this.http.post<T>(aniListGraphQLUrl, { query, variables });
  }
}
