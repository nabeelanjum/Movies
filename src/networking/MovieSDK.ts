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
}

export interface MovieDetails {
  description: string;
  keywords: string[];
  reviews: Review[];
  actors: Actor[];
}

class MovieSDK {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async fetchMovies(): Promise<Movie[]> {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.get(`${this.baseURL}/?q=`);
      return response.data?.description;
    } catch (error) {
      throw new Error(`Failed to fetch movies: ${error.message}`);
    }
  }

  async searchMovies(query: string): Promise<Movie[]> {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.get(`${this.baseURL}/?q=${query}`);
      return response.data?.description;
    } catch (error) {
      throw new Error(`Failed to search movies: ${error.message}`);
    }
  }

  async getMovieDetails(id: string): Promise<MovieDetails> {
    try {
      const response: AxiosResponse = await axios.get(`${this.baseURL}/?tt=${id}`);
      const movieData = response.data;
      const actors = movieData.main?.cast?.edges?.map((item) => ({
        originalName: item.node?.name?.nameText?.text,
        castName: item.node?.characters?.[0]?.name,
        image: item.node?.name?.primaryImage?.url,
      }));
      const reviews = movieData.main?.featuredReviews?.edges?.map((item) => ({
        date: item.node?.submissionDate,
        text: item.node?.text?.originalText.plaidHtml,
        summary: item.node?.summary?.originalText,
      }));
      const details = {
        description: movieData.short?.description,
        keywords: movieData.short?.keywords?.split(','),
        reviews,
        actors,
      }
      return details;
    } catch (error) {
      throw new Error(`Failed to get movie details: ${error.message}`);
    }
  }
}

// Create a global instance to access all across the app //
const movieSDK = new MovieSDK('https://search.imdbot.workers.dev');

export default movieSDK;
