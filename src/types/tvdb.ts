/**
 * TypeScript types for TheTVDB.com API v4 responses
 * Documentation: https://github.com/thetvdb/v4-api
 */

/**
 * TVDB Login Response
 */
export interface TVDBLoginResponse {
  status: string;
  data: {
    token: string;
  };
}

/**
 * Generic TVDB API Response wrapper
 */
export interface TVDBResponse<T> {
  status: string;
  data: T;
}

/**
 * TVDB Artwork/Image
 */
export interface TVDBArtwork {
  id: number;
  image: string;
  thumbnail: string;
  language: string | null;
  type: number;
  score: number;
  width: number;
  height: number;
}

/**
 * TVDB Artwork Type enum
 * Reference: https://thetvdb.github.io/v4-api/#/Artwork%20Types
 */
export enum TVDBArtworkType {
  BANNER = 1,
  POSTER = 2,
  BACKGROUND = 3,
  ICON = 5,
  CLEARART = 6,
  CLEARLOGO = 7,
  ACTOR = 8,
  CINEMAGRAPH = 9,
}

/**
 * TVDB Genre
 */
export interface TVDBGenre {
  id: number;
  name: string;
  slug: string;
}

/**
 * TVDB Company (Network, Production Company)
 */
export interface TVDBCompany {
  id: number;
  name: string;
  slug: string;
  primaryCompanyType?: number;
  country?: string;
}

/**
 * TVDB Character (for cast)
 */
export interface TVDBCharacter {
  id: number;
  name: string;
  peopleId: number;
  seriesId?: number;
  movieId?: number;
  episodeId?: number;
  type: number;
  image: string | null;
  sort: number;
  isFeatured: boolean;
  url: string;
  nameTranslations: string[] | null;
  overviewTranslations: string[] | null;
  aliases: string[] | null;
  personName: string;
  personImgURL: string | null;
  tagOptions: any | null;
}

/**
 * TVDB Person (crew member)
 */
export interface TVDBPerson {
  id: number;
  name: string;
  image: string | null;
}

/**
 * TVDB Remote ID (external references like IMDB)
 */
export interface TVDBRemoteId {
  id: string;
  type: number;
  sourceName: string;
}

/**
 * TVDB Remote ID Type enum
 */
export enum TVDBRemoteIdType {
  IMDB = 2,
  TMDB = 12,
  OFFICIAL_WEBSITE = 1,
  FACEBOOK = 10,
  TWITTER = 11,
  INSTAGRAM = 13,
  REDDIT = 14,
  TIKTOK = 15,
  FANSITE = 4,
}

/**
 * TVDB Content Rating
 */
export interface TVDBContentRating {
  id: number;
  name: string;
  country: string;
  description: string;
  contentType: string;
  order: number;
  fullName: string | null;
}

/**
 * TVDB Alias
 */
export interface TVDBAlias {
  language: string;
  name: string;
}

/**
 * TVDB Translation
 */
export interface TVDBTranslation {
  name: string;
  overview: string;
  language: string;
  aliases: string[] | null;
  isAlias: boolean;
  isPrimary: boolean;
  tagline?: string;
}

/**
 * TVDB Season
 */
export interface TVDBSeason {
  id: number;
  seriesId: number;
  type: TVDBSeasonType;
  name: string | null;
  number: number;
  nameTranslations: string[] | null;
  overviewTranslations: string[] | null;
  image: string | null;
  imageType: number | null;
  companies: {
    studio: TVDBCompany[] | null;
    network: TVDBCompany[] | null;
    production: TVDBCompany[] | null;
    distributor: TVDBCompany[] | null;
    special_effects: TVDBCompany[] | null;
  };
  lastUpdated: string;
}

/**
 * TVDB Season Type
 */
export interface TVDBSeasonType {
  id: number;
  name: string;
  type: string;
  alternateName: string | null;
}

/**
 * TVDB Episode
 */
export interface TVDBEpisode {
  id: number;
  seriesId: number;
  name: string | null;
  aired: string | null;
  runtime: number | null;
  nameTranslations: string[] | null;
  overview: string | null;
  overviewTranslations: string[] | null;
  image: string | null;
  imageType: number | null;
  isMovie: number;
  seasons: TVDBSeason[] | null;
  number: number;
  seasonNumber: number;
  lastUpdated: string;
  finaleType: string | null;
  airsBeforeSeason?: number;
  airsBeforeEpisode?: number;
  airsAfterSeason?: number;
  year: string | null;
  // Extended info
  productionCode?: string;
  nominations?: any[] | null;
  characters?: TVDBCharacter[] | null;
  contentRatings?: TVDBContentRating[] | null;
  remoteIds?: TVDBRemoteId[] | null;
  tagOptions?: any[] | null;
  trailers?: any[] | null;
  networks?: TVDBCompany[] | null;
  studios?: TVDBCompany[] | null;
  companies?: TVDBCompany[] | null;
  translations?: {
    nameTranslations: TVDBTranslation[] | null;
    overviewTranslations: TVDBTranslation[] | null;
    aliases: string[] | null;
  };
}

/**
 * TVDB Series (TV Show)
 */
export interface TVDBSeries {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  nameTranslations: string[] | null;
  overviewTranslations: string[] | null;
  aliases: TVDBAlias[] | null;
  firstAired: string | null;
  lastAired: string | null;
  nextAired: string | null;
  score: number;
  status: TVDBStatus;
  originalCountry: string | null;
  originalLanguage: string | null;
  defaultSeasonType: number;
  isOrderRandomized: boolean;
  lastUpdated: string;
  averageRuntime: number | null;
  episodes: TVDBEpisode[] | null;
  overview: string | null;
  year: string | null;
  // Extended info (from /series/{id}/extended)
  artworks?: TVDBArtwork[] | null;
  companies?: TVDBCompany[] | null;
  originalNetwork?: TVDBCompany | null;
  latestNetwork?: TVDBCompany | null;
  genres?: TVDBGenre[] | null;
  trailers?: any[] | null;
  lists?: any[] | null;
  remoteIds?: TVDBRemoteId[] | null;
  characters?: TVDBCharacter[] | null;
  airsDays?: {
    sunday: boolean;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
  };
  airsTime?: string | null;
  seasons?: TVDBSeason[] | null;
  tags?: any[] | null;
  contentRatings?: TVDBContentRating[] | null;
  seasonTypes?: TVDBSeasonType[] | null;
  translations?: {
    nameTranslations: TVDBTranslation[] | null;
    overviewTranslations: TVDBTranslation[] | null;
    aliases: string[] | null;
  };
}

/**
 * TVDB Status
 */
export interface TVDBStatus {
  id: number;
  name: string;
  recordType: string;
  keepUpdated: boolean;
}

/**
 * TVDB Search Result
 */
export interface TVDBSearchResult {
  objectID: string;
  aliases: string[];
  country: string;
  id: string;
  image_url: string | null;
  name: string;
  first_air_time: string | null;
  overview: string | null;
  primary_language: string | null;
  primary_type: string;
  status: string;
  type: string;
  tvdb_id: string;
  year: string | null;
  slug: string;
  overviews: Record<string, string>;
  translations: Record<string, string>;
  network: string | null;
  remote_ids: TVDBRemoteId[] | null;
  thumbnail: string | null;
}

/**
 * TVDB Search Response
 */
export interface TVDBSearchResponse {
  status: string;
  data: TVDBSearchResult[];
}

/**
 * TVDB Season Extended (includes episodes)
 */
export interface TVDBSeasonExtended extends TVDBSeason {
  artwork?: TVDBArtwork[] | null;
  episodes?: TVDBEpisode[] | null;
  trailers?: any[] | null;
  tagOptions?: any[] | null;
  translations?: {
    nameTranslations: TVDBTranslation[] | null;
    overviewTranslations: TVDBTranslation[] | null;
  };
}

/**
 * TVDB Episode Extended
 */
export interface TVDBEpisodeExtended extends TVDBEpisode {
  awards?: any[] | null;
  linkedMovie?: number | null;
}

/**
 * TVDB Series Extended (includes all details)
 */
export interface TVDBSeriesExtended extends TVDBSeries {
  // All extended fields are already in TVDBSeries interface
}

/**
 * TVDB Series Artworks Response
 */
export interface TVDBSeriesArtworksResponse {
  status: string;
  data: {
    artworks: TVDBArtwork[];
  };
}
