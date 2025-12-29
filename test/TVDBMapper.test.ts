/**
 * Unit tests for TVDB Mapper
 */

import { TVDBMapper } from '../src/mappers/TVDBMapper';
import { TVDBSeriesExtended, TVDBSeason, TVDBEpisode, TVDBArtworkType } from '../src/types/tvdb';

describe('TVDBMapper', () => {
  const mapper = new TVDBMapper();

  describe('mapSeries', () => {
    const mockTVDBSeries: TVDBSeriesExtended = {
      id: 152831,
      name: 'Adventure Time',
      slug: 'adventure-time',
      image: 'https://artworks.thetvdb.com/banners/posters/adventure-time.jpg',
      nameTranslations: ['eng'],
      overviewTranslations: ['eng'],
      aliases: null,
      firstAired: '2010-04-05',
      lastAired: '2018-09-03',
      nextAired: null,
      score: 8500,
      status: { id: 1, name: 'Ended', recordType: 'series', keepUpdated: false },
      originalCountry: 'usa',
      originalLanguage: 'eng',
      defaultSeasonType: 1,
      isOrderRandomized: false,
      lastUpdated: '2023-01-01',
      averageRuntime: 11,
      episodes: null,
      overview: 'Unlikely heroes Finn and Jake are buddies who traverse the mystical Land of Ooo.',
      year: '2010',
      artworks: [
        { id: 1, image: 'https://artworks.thetvdb.com/poster.jpg', thumbnail: '', language: 'eng', type: TVDBArtworkType.POSTER, score: 100, width: 680, height: 1000 },
        { id: 2, image: 'https://artworks.thetvdb.com/background.jpg', thumbnail: '', language: 'eng', type: TVDBArtworkType.BACKGROUND, score: 100, width: 1920, height: 1080 },
        { id: 3, image: 'https://artworks.thetvdb.com/clearlogo.png', thumbnail: '', language: 'eng', type: TVDBArtworkType.CLEARLOGO, score: 100, width: 800, height: 310 },
      ],
      genres: [
        { id: 16, name: 'Animation', slug: 'animation' },
        { id: 35, name: 'Comedy', slug: 'comedy' },
      ],
      originalNetwork: { id: 56, name: 'Cartoon Network', slug: 'cartoon-network' },
      latestNetwork: { id: 56, name: 'Cartoon Network', slug: 'cartoon-network' },
      companies: [
        { id: 1, name: 'Frederator Studios', slug: 'frederator-studios' },
      ],
      remoteIds: [
        { id: 'tt1305826', type: 2, sourceName: 'IMDB' },
        { id: '15260', type: 12, sourceName: 'TheMovieDB.com' },
      ],
      characters: [
        {
          id: 1,
          name: 'Finn the Human',
          peopleId: 123,
          seriesId: 152831,
          type: 3, // Actor
          image: null,
          sort: 0,
          isFeatured: true,
          url: '',
          nameTranslations: null,
          overviewTranslations: null,
          aliases: null,
          personName: 'Jeremy Shada',
          personImgURL: 'https://artworks.thetvdb.com/actor.jpg',
          tagOptions: null,
        },
        {
          id: 2,
          name: '',
          peopleId: 456,
          seriesId: 152831,
          type: 1, // Director
          image: null,
          sort: 0,
          isFeatured: false,
          url: '',
          nameTranslations: null,
          overviewTranslations: null,
          aliases: null,
          personName: 'Larry Leichliter',
          personImgURL: null,
          tagOptions: null,
        },
      ],
      contentRatings: [
        { id: 1, name: 'TV-PG', country: 'usa', description: '', contentType: 'series', order: 1, fullName: null },
      ],
      seasons: [],
      seasonTypes: [
        { id: 1, name: 'Aired Order', type: 'official', alternateName: null },
        { id: 2, name: 'DVD Order', type: 'dvd', alternateName: null },
      ],
    };

    it('should map basic TV show fields', () => {
      const show = mapper.mapSeries(mockTVDBSeries);

      expect(show.type).toBe('show');
      expect(show.title).toBe('Adventure Time');
      expect(show.originallyAvailableAt).toBe('2010-04-05');
      expect(show.year).toBe(2010);
      expect(show.summary).toBe('Unlikely heroes Finn and Jake are buddies who traverse the mystical Land of Ooo.');
    });

    it('should generate correct ratingKey and guid', () => {
      const show = mapper.mapSeries(mockTVDBSeries);

      expect(show.ratingKey).toBe('tvdb-show-152831');
      expect(show.guid).toBe('tv.plex.agents.custom.example.thetvdb.tv://show/tvdb-show-152831');
      expect(show.key).toBe('/library/metadata/tvdb-show-152831/children');
    });

    it('should map image URLs correctly', () => {
      const show = mapper.mapSeries(mockTVDBSeries);

      expect(show.thumb).toBe('https://artworks.thetvdb.com/banners/posters/adventure-time.jpg');
      expect(show.art).toBe('https://artworks.thetvdb.com/background.jpg');
    });

    it('should map genres', () => {
      const show = mapper.mapSeries(mockTVDBSeries);

      expect(show.Genre).toHaveLength(2);
      expect(show.Genre?.[0].tag).toBe('Animation');
      expect(show.Genre?.[1].tag).toBe('Comedy');
    });

    it('should map external IDs', () => {
      const show = mapper.mapSeries(mockTVDBSeries);

      expect(show.Guid).toBeDefined();
      expect(show.Guid).toHaveLength(3);
      expect(show.Guid?.find(g => g.id === 'tvdb://152831')).toBeDefined();
      expect(show.Guid?.find(g => g.id === 'imdb://tt1305826')).toBeDefined();
      expect(show.Guid?.find(g => g.id === 'tmdb://15260')).toBeDefined();
    });

    it('should map networks', () => {
      const show = mapper.mapSeries(mockTVDBSeries);

      expect(show.Network).toHaveLength(1);
      expect(show.Network?.[0].tag).toBe('Cartoon Network');
    });

    it('should map cast', () => {
      const show = mapper.mapSeries(mockTVDBSeries);

      expect(show.Role).toHaveLength(1);
      expect(show.Role?.[0].tag).toBe('Jeremy Shada');
      expect(show.Role?.[0].role).toBe('Finn the Human');
      expect(show.Role?.[0].order).toBe(1);
      expect(show.Role?.[0].thumb).toBe('https://artworks.thetvdb.com/actor.jpg');
    });

    it('should map crew (directors)', () => {
      const show = mapper.mapSeries(mockTVDBSeries);

      expect(show.Director).toHaveLength(1);
      expect(show.Director?.[0].tag).toBe('Larry Leichliter');
    });

    it('should map ratings', () => {
      const show = mapper.mapSeries(mockTVDBSeries);

      expect(show.Rating).toHaveLength(1);
      expect(show.Rating?.[0].image).toBe('thetvdb://image.rating');
      expect(show.Rating?.[0].type).toBe('audience');
      expect(show.Rating?.[0].value).toBe(8500);
    });

    it('should map content rating for US', () => {
      const show = mapper.mapSeries(mockTVDBSeries, { country: 'USA' });

      expect(show.contentRating).toBe('TV-PG');
    });

    it('should convert runtime to milliseconds', () => {
      const show = mapper.mapSeries(mockTVDBSeries);

      // 11 minutes * 60 seconds * 1000 milliseconds
      expect(show.duration).toBe(660000);
    });

    it('should map studios', () => {
      const show = mapper.mapSeries(mockTVDBSeries);

      expect(show.Studio).toHaveLength(1);
      expect(show.Studio?.[0].tag).toBe('Frederator Studios');
      expect(show.studio).toBe('Cartoon Network');
    });

    it('should map countries', () => {
      const show = mapper.mapSeries(mockTVDBSeries);

      expect(show.Country).toHaveLength(1);
      expect(show.Country?.[0].tag).toBe('usa');
    });

    it('should map season types', () => {
      const show = mapper.mapSeries(mockTVDBSeries);

      expect(show.SeasonType).toHaveLength(2);
      expect(show.SeasonType?.[0].tag).toBe('Aired Order');
      expect(show.SeasonType?.[1].tag).toBe('DVD Order');
    });
  });

  describe('mapSeason', () => {
    const mockTVDBSeason: TVDBSeason = {
      id: 12345,
      seriesId: 152831,
      type: { id: 1, name: 'Aired Order', type: 'official', alternateName: null },
      name: 'Season 8',
      number: 8,
      nameTranslations: null,
      overviewTranslations: null,
      image: 'https://artworks.thetvdb.com/season-poster.jpg',
      imageType: 7,
      companies: { studio: null, network: null, production: null, distributor: null, special_effects: null },
      lastUpdated: '2023-01-01',
    };

    it('should map basic season fields', () => {
      const season = mapper.mapSeason(
        mockTVDBSeason,
        152831,
        'Adventure Time',
        'tv.plex.agents.custom.example.thetvdb.tv://show/tvdb-show-152831',
        'https://artworks.thetvdb.com/show-thumb.jpg'
      );

      expect(season.type).toBe('season');
      expect(season.title).toBe('Season 8');
      expect(season.index).toBe(8);
    });

    it('should generate correct season ratingKey and guid', () => {
      const season = mapper.mapSeason(
        mockTVDBSeason,
        152831,
        'Adventure Time',
        'tv.plex.agents.custom.example.thetvdb.tv://show/tvdb-show-152831'
      );

      expect(season.ratingKey).toBe('tvdb-season-152831-8');
      expect(season.guid).toBe('tv.plex.agents.custom.example.thetvdb.tv://season/tvdb-season-152831-8');
    });

    it('should map parent relationships', () => {
      const season = mapper.mapSeason(
        mockTVDBSeason,
        152831,
        'Adventure Time',
        'tv.plex.agents.custom.example.thetvdb.tv://show/tvdb-show-152831',
        'https://artworks.thetvdb.com/show-thumb.jpg'
      );

      expect(season.parentRatingKey).toBe('tvdb-show-152831');
      expect(season.parentGuid).toBe('tv.plex.agents.custom.example.thetvdb.tv://show/tvdb-show-152831');
      expect(season.parentType).toBe('show');
      expect(season.parentTitle).toBe('Adventure Time');
      expect(season.parentThumb).toBe('https://artworks.thetvdb.com/show-thumb.jpg');
    });

    it('should map season poster', () => {
      const season = mapper.mapSeason(
        mockTVDBSeason,
        152831,
        'Adventure Time',
        'tv.plex.agents.custom.example.thetvdb.tv://show/tvdb-show-152831'
      );

      expect(season.thumb).toBe('https://artworks.thetvdb.com/season-poster.jpg');
    });
  });

  describe('mapEpisode', () => {
    const mockTVDBEpisode: TVDBEpisode = {
      id: 1418023,
      seriesId: 152831,
      name: 'The Wild Hunt',
      aired: '2017-09-17',
      runtime: 11,
      nameTranslations: null,
      overview: 'A fierce creature is terrorizing the Candy Kingdom...',
      overviewTranslations: null,
      image: 'https://artworks.thetvdb.com/episode-still.jpg',
      imageType: 11,
      isMovie: 0,
      seasons: null,
      number: 1,
      seasonNumber: 10,
      lastUpdated: '2023-01-01',
      finaleType: null,
      year: null,
    };

    it('should map basic episode fields', () => {
      const episode = mapper.mapEpisode(
        mockTVDBEpisode,
        152831,
        'Adventure Time',
        'tv.plex.agents.custom.example.thetvdb.tv://show/tvdb-show-152831',
        'Season 10',
        'tv.plex.agents.custom.example.thetvdb.tv://season/tvdb-season-152831-10'
      );

      expect(episode.type).toBe('episode');
      expect(episode.title).toBe('The Wild Hunt');
      expect(episode.summary).toBe('A fierce creature is terrorizing the Candy Kingdom...');
      expect(episode.index).toBe(1);
      expect(episode.parentIndex).toBe(10);
      expect(episode.originallyAvailableAt).toBe('2017-09-17');
      expect(episode.year).toBe(2017);
    });

    it('should generate correct episode ratingKey and guid', () => {
      const episode = mapper.mapEpisode(
        mockTVDBEpisode,
        152831,
        'Adventure Time',
        'tv.plex.agents.custom.example.thetvdb.tv://show/tvdb-show-152831',
        'Season 10',
        'tv.plex.agents.custom.example.thetvdb.tv://season/tvdb-season-152831-10'
      );

      expect(episode.ratingKey).toBe('tvdb-episode-152831-10-1');
      expect(episode.guid).toBe('tv.plex.agents.custom.example.thetvdb.tv://episode/tvdb-episode-152831-10-1');
    });

    it('should map parent and grandparent relationships', () => {
      const episode = mapper.mapEpisode(
        mockTVDBEpisode,
        152831,
        'Adventure Time',
        'tv.plex.agents.custom.example.thetvdb.tv://show/tvdb-show-152831',
        'Season 10',
        'tv.plex.agents.custom.example.thetvdb.tv://season/tvdb-season-152831-10',
        'https://artworks.thetvdb.com/show-thumb.jpg',
        'https://artworks.thetvdb.com/season-thumb.jpg'
      );

      // Parent (season)
      expect(episode.parentRatingKey).toBe('tvdb-season-152831-10');
      expect(episode.parentGuid).toBe('tv.plex.agents.custom.example.thetvdb.tv://season/tvdb-season-152831-10');
      expect(episode.parentType).toBe('season');
      expect(episode.parentTitle).toBe('Season 10');
      expect(episode.parentThumb).toBe('https://artworks.thetvdb.com/season-thumb.jpg');

      // Grandparent (show)
      expect(episode.grandparentRatingKey).toBe('tvdb-show-152831');
      expect(episode.grandparentGuid).toBe('tv.plex.agents.custom.example.thetvdb.tv://show/tvdb-show-152831');
      expect(episode.grandparentType).toBe('show');
      expect(episode.grandparentTitle).toBe('Adventure Time');
      expect(episode.grandparentThumb).toBe('https://artworks.thetvdb.com/show-thumb.jpg');
    });

    it('should convert episode runtime to milliseconds', () => {
      const episode = mapper.mapEpisode(
        mockTVDBEpisode,
        152831,
        'Adventure Time',
        'tv.plex.agents.custom.example.thetvdb.tv://show/tvdb-show-152831',
        'Season 10',
        'tv.plex.agents.custom.example.thetvdb.tv://season/tvdb-season-152831-10'
      );

      // 11 minutes * 60 seconds * 1000 milliseconds
      expect(episode.duration).toBe(660000);
    });

    it('should map episode snapshot image', () => {
      const episode = mapper.mapEpisode(
        mockTVDBEpisode,
        152831,
        'Adventure Time',
        'tv.plex.agents.custom.example.thetvdb.tv://show/tvdb-show-152831',
        'Season 10',
        'tv.plex.agents.custom.example.thetvdb.tv://season/tvdb-season-152831-10'
      );

      expect(episode.Image).toHaveLength(1);
      expect(episode.Image?.[0].type).toBe('snapshot');
      expect(episode.Image?.[0].url).toBe('https://artworks.thetvdb.com/episode-still.jpg');
    });
  });
});
