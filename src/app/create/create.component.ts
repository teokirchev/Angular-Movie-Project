import { Component, ViewChild } from '@angular/core';
import { MovieService } from '../Service/movie.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  constructor(private movieService: MovieService, private router: Router) { }

  @ViewChild('createForm') form: NgForm;

  id: string;
  name: string;
  year: number;
  imageUrl: string;
  isPremium: boolean = false;
  details: string;

  isSubmited: boolean = false

  onCreateMovie() {    

    this.isSubmited = true;
    
    if(this.form.valid && this.isSubmited === true) {
      if(confirm('Do you want to create this movie?')) {
        this.movieService.createMovie(this.form.value);
        console.log(this.form.form.value);
        
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
