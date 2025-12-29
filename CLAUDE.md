# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript-based Node.js project for creating a Plex-compatible Custom Metadata Provider using TheTVDB.com (TVDB) as the data source. The provider implements the Plex Media Provider API specification to deliver metadata for TV shows, seasons, and episodes.

## Architecture

### Plex Media Provider System

This project implements three core object models that work together:

1. **MediaProvider** (`docs/MediaProvider.md`): The root object that defines the provider's capabilities, supported metadata types (shows, seasons, episodes), and available features (metadata retrieval, matching).

2. **Metadata** (`docs/Metadata.md`): Complex JSON response schema for individual content items. Each metadata type (show/season/episode) has:
   - Core attributes (ratingKey, guid, type, title, etc.)
   - Type-specific attributes (e.g., seasons/episodes have parent references)
   - Optional arrays (Image, Genre, Role, Director, Rating, etc.)
   - Hierarchical relationships via `Children` object for TV shows/seasons

3. **API Endpoints** (`docs/API Endpoints.md`): Defines three features:
   - **Metadata Feature**: GET endpoint to retrieve full metadata by ratingKey
   - **Match Feature**: POST endpoint to find matches based on contextual hints (title, year, filename, etc.)
   - **Collection Feature**: GET endpoint for retrieving collection metadata (not implemented)

### GUID System

All metadata items use a custom GUID format: `{scheme}://{metadataType}/{ratingKey}`

- Scheme must use prefix: `tv.plex.agents.custom.` followed by unique identifier
- Example: `tv.plex.agents.custom.example.thetvdb.tv://show/tvdb-show-15260`
- ratingKey uses only: `[a-zA-Z0-9_-]`

### Key Integration Points

- **External IDs**: Metadata should include `Guid` array with mappings to imdb, tmdb, tvdb for cross-provider compatibility
- **Localization**: Support `X-Plex-Language` and `X-Plex-Country` headers for region-specific content
- **TV Show Hierarchies**: Shows → Seasons → Episodes require proper parent/grandparent relationships with corresponding ratingKeys and GUIDs
- **Children Objects**: TV Shows and Seasons must support `includeChildren=1` parameter to return child metadata arrays
- **Season Orderings**: TVDB supports multiple season types (default, dvd, absolute, etc.)

## Data Source

The provider fetches metadata from TheTVDB.com API v4 using Axios for HTTP requests. Key considerations:

- **Authentication**: TVDB API v4 requires bearer token authentication. The `TVDBClient` automatically handles login and token refresh.
- Map TVDB data structures to Plex-compatible Metadata format
- Handle image assets (TVDB provides full URLs)
- Transform TVDB ratings to Plex Rating array format
- Map TVDB genre objects to genre names
- Handle character/crew data mapping to Role/Director/Writer/Producer arrays

### TVDB API Reference

- API Documentation: https://github.com/thetvdb/v4-api
- Base URL: https://api4.thetvdb.com/v4
- Key endpoints:
  - `/login` - Get authentication token
  - `/search` - Search for series
  - `/series/{id}/extended` - Get full series details
  - `/seasons/{id}/extended` - Get season with episodes
  - `/episodes/{id}/extended` - Get episode details
  - `/series/{id}/artworks` - Get all artwork for a series

## Testing Strategy

Unit tests must validate:
- MediaProvider schema compliance (identifier, Features array, Types array)
- Metadata schema compliance for each type with all required fields
- Type-specific attributes (e.g., parentGuid for seasons, grandparentGuid for episodes)
- GUID format validation
- Children object structure for hierarchical types
- Optional array structures (Image, Genre, Rating, etc.)

## Project Structure

```
src/
├── config/          # Environment configuration
├── constants.ts     # Shared constants (API paths)
├── models/          # TypeScript interfaces
│   ├── MediaProvider.ts
│   └── Metadata.ts
├── types/           # TVDB API types
│   └── tvdb.ts
├── services/        # Business logic
│   ├── TVDBClient.ts       # TVDB API client with auth handling
│   ├── MatchService.ts     # Match feature implementation
│   └── MetadataService.ts  # Metadata fetch implementation
├── mappers/         # TVDB to Plex transformations
│   └── TVDBMapper.ts
├── utils/           # Helper functions
│   ├── guid.ts
│   └── logger.ts
├── providers/       # Provider definitions
│   └── TVProvider.ts
├── routes/          # Express routes
│   └── tvRoutes.ts
├── app.ts           # Express app setup
└── server.ts        # Server entry point
```

## Development Commands

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run the server
npm start

# Run tests
npm test

# Watch mode for development
npm run build:watch
```

## Environment Variables

Required:
- `TVDB_API_KEY` - Your TVDB API key from https://thetvdb.com/dashboard/account/apikey

Optional:
- `PORT` - Server port (default: 3000)
- `BASE_URL` - Base URL for the server (default: http://localhost:3000)
- `LOG_LEVEL` - Logging level (default: info)
