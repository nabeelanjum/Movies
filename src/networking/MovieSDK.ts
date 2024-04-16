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
      throw new Error(`Failed to fetch random movies: ${error.message}`);
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

  async getMovieDetails(id: string): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.get(`${this.baseURL}/?tt=${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get movie details: ${error.message}`);
    }
  }
}

// Create a global instance to access all across the app //
const movieSDK = new MovieSDK('https://search.imdbot.workers.dev');

export default movieSDK;
