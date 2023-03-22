export enum AniListMediaListStatus {
  CURRENT = 'CURRENT',
  PLANNING = 'PLANNING',
  COMPLETED = 'COMPLETED',
  DROPPED = 'DROPPED',
  PAUSED = 'PAUSED',
  REPEATING = 'REPEATING',
}

export enum AniListMediaStatus {
  FINISHED = 'FINISHED',
  RELEASING = 'RELEASING',
  NOT_YET_RELEASED = 'NOT_YET_RELEASED',
  CANCELLED = 'CANCELLED',
  HIATUS = 'HIATUS',
}

export interface AniListRawMedia {
  id: number;
  title: {
    userPreferred: string;
  };
  status: AniListMediaStatus;
  episodes: number;
  coverImage: {
    large: string;
  };
  nextAiringEpisode?: {
    timeUntilAiring: number;
    episode: number;
  };
  externalLinks: {
    url: string;
    site: string;
    icon: string;
    color: string;
  }[];
  endDate: {
    year: number;
    month: number;
    day: number;
  };
  siteUrl: string;
}

export interface AniListMedia extends AniListRawMedia {
  // These two are merged from the MediaListItem
  mediaListId: number;
  progress: number;
}
