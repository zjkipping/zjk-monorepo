import { MediaStatus } from './types';

export interface PaginatedMediaListQuery {
  Page: {
    pageInfo: {
      currentPage: number;
      hasNextPage: boolean;
    };
    mediaList: {
      id: number;
      progress: number;
      media: {
        id: number;
        title: {
          userPreferred: string;
        };
        status: MediaStatus;
        episodes: number;
        coverImage: {
          extraLarge: string;
          large: string;
          medium: string;
        };
        nextAiringEpisode: {
          timeUntilAiring: number;
        };
        externalLinks: {
          url: string;
          site: string;
          icon: string;
        };
        streamingEpisodes: {
          title: string;
          thumbnail: string;
          url: string;
          site: string;
        };
      };
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
          extraLarge
          large
          medium
        },
        nextAiringEpisode {
          timeUntilAiring
        },
        externalLinks {
          url,
          site,
          icon
        },
        streamingEpisodes {
          title,
          thumbnail,
          url,
          site,
        }
    	}
    }
  }
}
`;
