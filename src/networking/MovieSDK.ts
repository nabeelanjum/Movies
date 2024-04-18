import axios, { AxiosResponse } from 'axios';

export interface Movie {
  '#TITLE': string;
  '#IMDB_ID': string;
  '#IMG_POSTER': string;
  '#ACTORS': string;
  '#YEAR': number;
}

interface ApiResponse {
  ok: string;
  description: Movie[];
  error_code: number;
  usage?: string;
}

// Just the things that are being used on FE (since API docs are not properly available) //

export type Actor = {
  originalName: string;
  castName: string;
  image: string;
}

export type Review = {
  date: string;
  text: string;
  summary: string;
  rating: number;
}

export interface MovieDetails {
  description: string;
  keywords: string[];
  rating: {
    averageRating: number,
    voteCount: number,
    reviews: Review[]
  };
  actors: Actor[];
}

class MovieSDK {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // API doesn't provides proper docs and also the response struct is different in different endpoints
  // so error handling is not per best standards

  async fetchMovies(): Promise<Movie[]> {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.get(`${this.baseURL}/?q=''`);
      if (response.data?.error_code !== 200)
        throw {
          code: response.data?.error_code,
          message: response.data?.usage || 'internal API error',
        };
      return response.data?.description;
    } catch (error) {
      throw new Error(`Failed to fetch movies: ${error.message}`);
    }
  }

  async searchMovies(query: string): Promise<Movie[]> {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.get(`${this.baseURL}/?q=${query}`);
      if (response.data?.error_code !== 200)
        throw {
          code: response.data?.error_code,
          message: response.data?.usage || 'internal API error',
        };
      return response.data?.description;
    } catch (error) {
      throw new Error(`Failed to search movies: ${error.message}`);
    }
  }

  async getMovieDetails(id: string): Promise<MovieDetails> {
    try {
      const response: AxiosResponse = await axios.get(`${this.baseURL}/?tt=${id}`);
      const movieData = response.data;
      // TODO: make helper funcs to simplify these response objects //
      const actors = movieData.main?.cast?.edges?.map((item) => ({
        originalName: item.node?.name?.nameText?.text,
        castName: item.node?.characters?.[0]?.name,
        image: item.node?.name?.primaryImage?.url,
      })) ?? [];
      const reviews = movieData.main?.featuredReviews?.edges?.map((item) => ({
        date: item.node?.submissionDate,
        text: item.node?.text?.originalText?.plaidHtml?.split('<br/>')?.join('\n'),
        summary: item.node?.summary?.originalText,
        rating: item.node?.authorRating,
      })) ?? [];
      const details: MovieDetails = {
        description: movieData.short?.description,
        keywords: movieData.short?.keywords?.split(','),
        actors,
        rating: {
          averageRating: movieData.top?.ratingsSummary?.aggregateRating,
          voteCount: movieData.top?.ratingsSummary?.voteCount,
          reviews
        }
      }
      return details;
    } catch (error) {
      throw new Error(`Failed to get movie details: ${error.message}`);
    }
  }
}

// Creating a global instance to access all across the app //
const movieSDK = new MovieSDK('https://search.imdbot.workers.dev');

export default movieSDK;
