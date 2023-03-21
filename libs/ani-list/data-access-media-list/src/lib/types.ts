export enum MediaListStatus {
  CURRENT = 'CURRENT',
  PLANNING = 'PLANNING',
  COMPLETED = 'COMPLETED',
  DROPPED = 'DROPPED',
  PAUSED = 'PAUSED',
  REPEATING = 'REPEATING',
}

export enum MediaStatus {
  FINISHED = 'FINISHED',
  RELEASING = 'RELEASING',
  NOT_YET_RELEASED = 'NOT_YET_RELEASED',
  CANCELLED = 'CANCELLED',
  HIATUS = 'HIATUS',
}

export interface Media {
  // These first two are technically from the MediaListItem
  mediaListId: number;
  progress: number;

  // The rest are from the Media itself
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
}
