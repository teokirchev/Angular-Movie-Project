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

  id: number;
  name: string;
  year: number;
  imageUrl: string;
  isPremium: boolean = false;
  details: string;

  isSubmited: boolean = false

  onCreateMovie() {    
    
    this.name = this.form.value.name;
    this.year = this.form.value.year;
    this.imageUrl = this.form.value.imageUrl;
    this.isPremium = this.form.value.isPremium;
    this.details = this.form.value.details;

    this.isSubmited = true;
    
    console.log(this.form);
    if(this.form.valid && this.isSubmited === true) {
      if(confirm('Do you want to create this movie?')) {
        this.movieService.createMovie(this.id, this.name, this.year, this.imageUrl, this.isPremium, this.details);
        this.form.reset()
        // this.router.navigate(['/catalog']);
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
