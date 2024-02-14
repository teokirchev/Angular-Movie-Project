import { EventEmitter, Injectable } from '@angular/core';
import { Movie } from '../Models/Movie';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  url = 'https://angular-movie-project-732b7-default-rtdb.firebaseio.com/';

  movies: Movie[] = [];
  moviesUpdated = new EventEmitter<Movie[]>();

  getAllmovies() {
    return this.http.get<{[key: string]: Movie}>(`${this.url}movies.json`)
      .pipe(map((response) => {
        let movies = [];
        for(let key in response) {
          if(response.hasOwnProperty(key)) {
            movies.push({...response[key], id: key});
          }
        }
        return movies;
      }))
  };

  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.url}movies/${id}.json`
    );
  }

  createMovie(movie: Movie) {
    return this.http.post<{name: string}>
    (`${this.url}movies.json`, movie)
  }
  
  editMovie(id: string, editMovie: Movie) {
    return this.http.put(`${this.url}movies/${id}.json`, editMovie)
  }

  deleteMovie(id: string) {
    return this.http.delete(`${this.url}movies/${id}.json`)
  }
}
