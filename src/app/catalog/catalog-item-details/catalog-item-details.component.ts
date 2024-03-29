import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/Models/Movie';
import { MovieService } from 'src/app/Service/movie.service';

@Component({
  selector: 'app-catalog-item-details',
  templateUrl: './catalog-item-details.component.html',
  styleUrls: ['./catalog-item-details.component.css']
})
export class CatalogItemDetailsComponent implements OnInit, OnDestroy{
  
  selectedMovie: Movie;
  movieId: string;
  paramMapObs;

  constructor(
    private movieService: MovieService,
    private activeRoute: ActivatedRoute,
    private router: Router
    ) {
     
  }
  
  ngOnInit() {
    this.paramMapObs = this.activeRoute.paramMap.subscribe((data) => {
      this.movieId = data.get('id');
      this.movieService.getMovieById(this.movieId).subscribe((movie) => {
        this.selectedMovie = movie;
      })
      // this.selectedMovie = this.movieService.movies.find(movie => movie.id === this.movieId);
    })
  }
  ngOnDestroy() {
    this.paramMapObs.unsubscribe()
  }

  deleteMovie() {
    this.movieService.deleteMovie(this.movieId)
    .subscribe(() => {
      this.movieService.getAllmovies().subscribe((movies) => {
        this.movieService.moviesUpdated.emit(movies)
      });
    });;
    this.router.navigate(['/catalog']);
  }

  editMovie() {
    this.router.navigate(['/edit', this.movieId]);
  }
}
