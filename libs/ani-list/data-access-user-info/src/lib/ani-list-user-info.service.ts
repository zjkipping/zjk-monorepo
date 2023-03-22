import { Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

import { AniListGraphQLApiService } from '@zjk/ani-list/data-access-graphql-api';

const userInfoQuery = `
query {
  Viewer {
    id,
    name,
    bannerImage,
    avatar {
      large,
      medium
    },
    siteUrl
  }
}
`;

interface AniListUserInfoQuery {
  Viewer: AniListUserInfo;
}

export interface AniListUserInfo {
  id: number;
  name: string;
  avatar: {
    large: string;
    medium: string;
  };
  bannerImage: string;
  siteUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class AniListUserInfoService {
  userInfo: Observable<AniListUserInfo>;

  constructor(api: AniListGraphQLApiService) {
    this.userInfo = api.sendQuery<AniListUserInfoQuery>(userInfoQuery).pipe(
      map((response) => response.data.Viewer),
      shareReplay(1),
    );
  }
}
