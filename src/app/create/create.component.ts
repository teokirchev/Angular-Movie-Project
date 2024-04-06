import { Component, ViewChild,  } from '@angular/core';
import { MovieService } from '../Service/movie.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Movie } from '../Models/Movie';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  constructor(
    private movieService: MovieService, 
    private router: Router
    ) { }

  @ViewChild('createForm') form: NgForm;

  id: string;
  name: string;
  year: number;
  imageUrl: string;
  isPremium: boolean = false;
  details: string;

  isSubmited: boolean = false;

  onCreateMovie() {    
    this.isSubmited = true;
    
    if(this.form.valid && this.isSubmited === true) {
      if(confirm('Do you want to create this movie?')) {
        const movieData = {
          ...this.form.value, 
          likesCount: 0,
          movieLikedBy: []
        }
        const obs = this.movieService.createMovie(movieData)
        .subscribe(() => {
          this.movieService.getAllmovies()
          .subscribe((movies) => {
            this.movieService.moviesUpdated.emit(movies)
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
    if(this.form.dirty && this.isSubmited === false){
      return confirm('You have unsaved changes. Do you want to exit the page?')
    } else {
      return true;
    }
  }
}
