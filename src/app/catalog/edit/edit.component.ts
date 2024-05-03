import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MovieService } from '../../Service/movie.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private movieService: MovieService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  @ViewChild('editForm') form: NgForm;

  id: string;
  name: string;
  year: number;
  imageUrl: string;
  isPremium: boolean;
  details: string;

  isLoading: boolean = false;
  isSubmited: boolean = false;
  paramMapObs;
  movieId: string;

  ngOnInit() {
    this.paramMapObs = this.activateRoute.paramMap.subscribe((params) => {
      this.isLoading = true;
      
      this.movieId = params.get('id');
      
      this.movieService.getMovieById(this.movieId).subscribe({
        
        next: (movie) => {
          
          if (movie) {
            this.isLoading = false
            this.id = movie.id;
            this.name = movie.name;
            this.year = movie.year;
            this.imageUrl = movie.imageUrl;
            this.isPremium = movie.isPremium;
            this.details = movie.details;
          }
           else {
            
            this.router.navigate(['/notfound'])
          }
        }, error: () => {
          this.router.navigate(['/notfound'])
          
        }
      })
    })
  }

  ngOnDestroy() {
    this.paramMapObs.unsubscribe()
  }
  ngAfterViewInit() {
    if (this.form) {
    }
}

  onEditMovie() {
    this.isSubmited = true;

    if (this.form.valid && this.isSubmited === true) {
      if (confirm('Do you want to edit this movie?')) {
        const formValue = {
          ...this.form.value,
          isPremium: this.form.value.isPremium === 'true',
          movieLikedBy: []
        };
        this.movieService.editMovie(this.movieId, formValue)
          .subscribe(() => {
            this.movieService.getAllmovies()
              .subscribe((movie) => {
                this.movieService.moviesUpdated.emit(movie)
              })
          });
        this.form.reset()
        this.router.navigate(['/catalog']);
      }
    } else {
      this.isSubmited = false
    }
  }

  canExit() {
    if (this.form && this.form.dirty && this.isSubmited === false) {
      return confirm('You have unsaved changes. Do you want to exit the page?')
    } else {
      return true;
    }
  }
}
