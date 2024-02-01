import { EventEmitter, Injectable } from '@angular/core';
import { Movie } from '../Models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  movies: Movie[] = [
    new Movie(1, 'The Godfather', 1999, 'https://upload.wikimedia.org/wikipedia/en/a/af/The_Godfather%2C_The_Game.jpg', true, 'The Godfather "Don" Vito Corleone is the head of the Corleone mafia family in New York. He is at the event of his daughter\'s wedding. Michael, Vito\'s youngest son and a decorated WW II Marine is also present at the wedding.'),
    new Movie(2, 'The Strongman', 2000, 'https://upload.wikimedia.org/wikipedia/en/a/af/The_Godfather%2C_The_Game.jpg', false, 'The Godfather "Don" Vito Corleone is the head of the Corleone mafia family in New York. He is at the event of his daughter\'s wedding. Michael, Vito\'s youngest son and a decorated WW II Marine is also present at the wedding.'),
    new Movie(3, 'The Nun', 2001, 'https://upload.wikimedia.org/wikipedia/en/a/af/The_Godfather%2C_The_Game.jpg', false, 'The Godfather "Don" Vito Corleone is the head of the Corleone mafia family in New York. He is at the event of his daughter\'s wedding. Michael, Vito\'s youngest son and a decorated WW II Marine is also present at the wedding.')
  ]

  getAllmovies() {
    return this.movies
  };
  

  createMovie( id: number, name: string, year: number, imageUrl: string, isPremium: boolean, details: string) {
    id = Math.random()
    let movie = new Movie(id, name, year, imageUrl, isPremium, details);
    
    this.movies.push(movie);
  }
}
