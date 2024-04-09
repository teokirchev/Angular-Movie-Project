import { EventEmitter, Injectable } from '@angular/core';
import { Movie } from '../Models/Movie';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, exhaustMap, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  url = 'https://angular-movie-project-732b7-default-rtdb.firebaseio.com/';

  movies: Movie[] = [];
  moviesUpdated = new EventEmitter<Movie[]>();

  getAllmovies() {
    // take operator will return the last one user object
    // exhaust operator will return new observable from the user object and it will
    //  replace previous observable in the entire observable chain 
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http.get<{ [key: string]: Movie }>(
        `${this.url}movies.json`,
        { params: new HttpParams().set('auth', user.token) }
      )
    }), map((response) => {
      let movies = [];
      for (let key in response) {
        if (response.hasOwnProperty(key)) {
          movies.push({ ...response[key], id: key });
        }
      }
      return movies;
    }))
  };

  getMovieById(id: string): Observable<Movie> {
    return this.authService.user.pipe(
    take(1), exhaustMap(user => {
      return this.http.get<Movie>(
        `${this.url}movies/${id}.json`,
        { params: new HttpParams().set('auth', user.token) }
      )
    }))
  }
  

  createMovie(movie: Movie) {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      const movieWithOwner = { ...movie, owner: user.id };
      return this.http.post<{ name: string }>
        (`${this.url}movies.json`, movieWithOwner,
          { params: new HttpParams().set('auth', user.token) }
        )
    }))
  }

  editMovie(id: string, editMovie: Movie) {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      const movieWithOwner = { ...editMovie, owner: user.id }
      return this.http.put(`${this.url}movies/${id}.json`, movieWithOwner,
        { params: new HttpParams().set('auth', user.token) }
      )
    }))
  }

  deleteMovie(id: string) {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http.delete(`${this.url}movies/${id}.json`,
        { params: new HttpParams().set('auth', user.token) }
      )
    }))
  }

  likeMovie(movieId: string) {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.getMovieById(movieId)
        .pipe(
          switchMap(movie => {
            let movieLikedBy: string[] = [];
            if (movie.movieLikedBy && movie.movieLikedBy.includes(user.id)) {
              movieLikedBy = movie.movieLikedBy.filter(id => id !== user.id);
            } else {
              movieLikedBy = [...(movie.movieLikedBy || []), user.id];
            }
            const updatedMovie = { ...movie, movieLikedBy };
            return this.http.put(`${this.url}movies/${movieId}.json`, updatedMovie,
              { params: new HttpParams().set('auth', user.token) }
            )
          })
        )
    }))
  }

}
