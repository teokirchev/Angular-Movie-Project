import { EventEmitter, Injectable } from '@angular/core';
import { Movie } from '../Models/Movie';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  // url = 'https://angular-movie-project-732b7-default-rtdb.firebaseio.com/';

  movies: Movie[] = []

  getAllmovies() {
    return this.http.get<{[key: string]: Movie}>(
      'https://angular-movie-project-732b7-default-rtdb.firebaseio.com/movies.json')
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
      `https://angular-movie-project-732b7-default-rtdb.firebaseio.com/movies/${id}.json`
    );
  }
  

  
  createMovie(movie: Movie) {
    this.http.post<{name: string}>
    ('https://angular-movie-project-732b7-default-rtdb.firebaseio.com/movies.json', movie)
    .subscribe((response) => {
      console.log(response);
    })
  }
  
}
