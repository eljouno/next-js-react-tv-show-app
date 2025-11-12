import {ACCESS_TOKEN, BASE_URL, IMAGE_BASE_URL} from '../globals';
/**
 * TMDB TV Shows API Service
 */


console.log('🔍 Environment variables:');
console.log('ACCESS_TOKEN:', ACCESS_TOKEN ? 'Défini ✅' : 'Non défini ❌');

const bearerHeaders = {
  'Authorization': `Bearer ${ACCESS_TOKEN}`,
  'accept': 'application/json'
};

/**
 * Helper to build image url
 */
export const getImageUrl = (path, size = 'original') => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

/**
 * Image sizes available
 */
export const IMAGE_SIZES = {
  poster: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
  backdrop: ['w300', 'w780', 'w1280', 'original'],
  profile: ['w45', 'w185', 'h632', 'original']
};

/**
 * Centralized error handling for API responses
 */
const handleResponse = async (response, errorMessage) => {
  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ API Error Details:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
      url: response.url
    });
    throw new Error(`${errorMessage}: ${response.status} - ${errorText}`);
  }
  return response.json();
};

/**
 * Get popular TV shows
 */
export const getPopularTVShows = async (page = 1) => {
  console.info('🔄 Fetching popular TV shows...');
  
  const response = await fetch(
    `${BASE_URL}/tv/popular?language=en-US&page=${page}`,
    { headers: bearerHeaders }
  );
  
  return handleResponse(response, 'Failed to fetch popular TV shows');
};

/**
 * Search TV shows by query
 */
export const searchTVShows = async (query, page = 1) => {
  if (!query.trim()) {
    throw new Error('Search query cannot be empty');
  }

  const response = await fetch(
    `${BASE_URL}/search/tv?query=${encodeURIComponent(query)}&language=en-US&page=${page}`,
    { headers: bearerHeaders }
  );
  return handleResponse(response, 'Failed to search TV shows');
};

/**
 * Get top rated TV shows
 */
export const getTopRatedTVShows = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/tv/top_rated?language=en-US&page=${page}`,
    { headers: bearerHeaders }
  );
  return handleResponse(response, 'Failed to fetch top rated TV shows');
};

/**
 * Get trending TV shows
 */
export const getTrendingTVShows = async (timeWindow = 'day', page = 1) => {
  const response = await fetch(
    `${BASE_URL}/trending/tv/${timeWindow}?language=en-US&page=${page}`,
    { headers: bearerHeaders }
  );
  return handleResponse(response, 'Failed to fetch trending TV shows');
};

/**
 * Get TV shows airing today
 */
export const getAiringTodayTVShows = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/tv/airing_today?language=en-US&page=${page}`,
    { headers: bearerHeaders }
  );
  return handleResponse(response, 'Failed to fetch airing today TV shows');
};

/**
 * Get TV shows currently on the air
 */
export const getOnTheAirTVShows = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/tv/on_the_air?language=en-US&page=${page}`,
    { headers: bearerHeaders }
  );
  return handleResponse(response, 'Failed to fetch on the air TV shows');
};

/**
 * Discover TV shows with custom filters
 */
export const discoverTVShows = async (filters = {}) => {
  const params = new URLSearchParams({
    language: 'en-US',
    page: filters.page || 1,
    sort_by: filters.sort_by || 'popularity.desc',
    ...filters
  });

  const response = await fetch(
    `${BASE_URL}/discover/tv?${params}`,
    { headers: bearerHeaders }
  );
  return handleResponse(response, 'Failed to discover TV shows');
};

/**
 * Get detailed information about a TV show
 */
export const getTVShowDetails = async (tvId) => {
  const response = await fetch(
    `${BASE_URL}/tv/${tvId}?language=en-US&append_to_response=credits,videos,similar,recommendations`,
    { headers: bearerHeaders }
  );
  return handleResponse(response, 'Failed to fetch TV show details');
};

/**
 * Get cast and crew credits for a TV show
 */
export const getTVShowCredits = async (tvId) => {
  const response = await fetch(
    `${BASE_URL}/tv/${tvId}/credits?language=en-US`,
    { headers: bearerHeaders }
  );
  return handleResponse(response, 'Failed to fetch TV show credits');
};

/**
 * Get videos (trailers, teasers, etc.) for a TV show
 */
export const getTVShowVideos = async (tvId) => {
  const response = await fetch(
    `${BASE_URL}/tv/${tvId}/videos?language=en-US`,
    { headers: bearerHeaders }
  );
  return handleResponse(response, 'Failed to fetch TV show videos');
};

/**
 * Get TV show recommendations based on a specific show
 */
export const getTVShowRecommendations = async (tvId, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/tv/${tvId}/recommendations?language=en-US&page=${page}`,
    { headers: bearerHeaders }
  );
  return handleResponse(response, 'Failed to fetch TV show recommendations');
};

/**
 * Get TV shows similar to a specific show
 */
export const getSimilarTVShows = async (tvId, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/tv/${tvId}/similar?language=en-US&page=${page}`,
    { headers: bearerHeaders }
  );
  return handleResponse(response, 'Failed to fetch similar TV shows');
};

/**
 * Get list of TV show genres
 */
export const getTVGenres = async () => {
  const response = await fetch(
    `${BASE_URL}/genre/tv/list?language=en-US`,
    { headers: bearerHeaders }
  );
  return handleResponse(response, 'Failed to fetch TV genres');
};

/**
 * Get TV shows by specific genre
 */
export const getTVShowsByGenre = async (genreId, page = 1) => {
  return discoverTVShows({
    with_genres: genreId,
    page,
    sort_by: 'popularity.desc'
  });
};

/**
 * Get highly rated TV shows above a minimum rating
 */
export const getHighRatedTVShows = async (minRating = 8, page = 1) => {
  return discoverTVShows({
    'vote_average.gte': minRating,
    page,
    sort_by: 'vote_average.desc'
  });
};
