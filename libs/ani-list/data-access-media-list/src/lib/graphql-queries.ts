import { MediaStatus } from './types';

export interface RawMedia {
  id: number;
  title: {
    userPreferred: string;
  };
  status: MediaStatus;
  episodes: number;
  coverImage: {
    large: string;
  };
  nextAiringEpisode: {
    timeUntilAiring: number;
    episode: number;
  };
  externalLinks: {
    url: string;
    site: string;
    icon: string;
  };
  endDate: {
    year: number;
    month: number;
    day: number;
  };
}

export interface PaginatedMediaListQuery {
  Page: {
    pageInfo: {
      currentPage: number;
      hasNextPage: boolean;
    };
    mediaList: {
      id: number;
      progress: number;
      media: RawMedia;
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
        }
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
