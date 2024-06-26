import { Component, OnInit, OnChanges } from '@angular/core';
import { Movie } from '../Models/Movie';
import { MovieService } from '../Service/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../Service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit {

  constructor(
    private movieService: MovieService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
  ) {
  };

  allMovies: Movie[] = []
  originalMovies: Movie[] = [];

  all: number;
  premium: number;
  basic: number;
  topRated

  updateCounts() {
    this.all = this.allMovies.length;
    this.premium = this.allMovies.filter(m => m.isPremium).length;
    this.basic = this.allMovies.filter(m => !m.isPremium).length;
  }

  selectedButtonChanged: string = 'all';

  searchedText: string = '';
  isLoading: boolean = false;
  errorMessage: string | null = null;

  changeRadioButtonEvent(value: string) {
    this.selectedButtonChanged = value;
    if (value === 'topRated') {
      this.allMovies.forEach(movie => {
        movie.averageRating = movie.averageRating || 0;
      });
      this.allMovies = this.allMovies.sort((a, b) => b.averageRating - a.averageRating);
    } else if(value === 'all') {
      this.movieService.getAllmovies().subscribe( (movie) => {
        this.allMovies = movie;
      });
      
    }
  }
  

  onSearchClicked(value: string) {
    this.router.navigate(['/catalog'], { queryParams: { search: value } })
  }

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      console.log(user);

    })
    this.movieService.moviesUpdated.subscribe((movies) => {
      this.allMovies = movies;
      this.updateCounts();
    })
    

    this.activeRoute.queryParamMap.subscribe((data) => {
      this.searchedText = data.get('search');

      if (this.searchedText === undefined || this.searchedText === null || this.searchedText === '') {
        this.isLoading = true
        this.movieService.getAllmovies().subscribe({
          next: (movies) => {
            this.allMovies = movies;
            this.updateCounts();

            this.isLoading = false;
          }, error: (error) => {
            this.setErrorMessage(error)
            this.isLoading = false;
          }
        });
      } else {
        this.isLoading = true
        this.movieService.getAllmovies().subscribe({
          next: (movies) => {
            this.allMovies = movies.filter((x) => x.name.toLowerCase()
              .includes(this.searchedText.toLowerCase()));
            this.updateCounts();
            this.isLoading = false
          }, error: (error) => {
            this.setErrorMessage(error)
            this.isLoading = false;
          }
        })
      }
    });

  }


  setErrorMessage(err: HttpErrorResponse) {
    if (err.status === 401) {
      this.errorMessage = 'You have no permission to perform this action!';
    } else if (err.status === 0) {
      this.errorMessage = 'Network error. Please check your internet connection.';
    } else if (err.status >= 500) {
      this.errorMessage = 'Server error. Please try again later.';
    } else if (err.status >= 400) {
      this.errorMessage = 'Client error. Please check your request.';
    }
    setTimeout(() => {
      this.errorMessage = null
    }, 4000);

  }


};
