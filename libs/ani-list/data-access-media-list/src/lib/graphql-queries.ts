import { AniListRawMedia } from '@zjk/ani-list/util-types';

export interface PaginatedMediaListQuery {
  Page: {
    pageInfo: {
      currentPage: number;
      hasNextPage: boolean;
    };
    mediaList: {
      id: number;
      progress: number;
      media: AniListRawMedia;
    }[];
  };
}

export const paginatedMediaListQuery = `
query ($userId: Int, $pageNumber: Int, $mediaListStatuses: [MediaListStatus]) {
  Page (page: $pageNumber, perPage: 50) {
    pageInfo {
      currentPage,
      hasNextPage
    },
    mediaList (userId: $userId, type: ANIME, status_in: $mediaListStatuses) {
      id,
      progress
      media {
        id,
        title {
          userPreferred
        },
        status,
        episodes,
        coverImage {
          large
        },
        nextAiringEpisode {
          timeUntilAiring,
          episode
        },
        externalLinks {
          url,
          site,
          icon
        },
        endDate {
          year,
          month,
          day
        },
        siteUrl
    	}
    }
  }
}
`;

export const updateEpisodeProgressQuery = `
mutation ($mediaListId: Int, $progress: Int) {
  SaveMediaListEntry (id: $mediaListId, progress: $progress) {
    id
    progress
  }
}
`;
