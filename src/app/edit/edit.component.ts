import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MovieService } from '../Service/movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{

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
  isPremium: boolean = false;
  details: string;

  isSubmited: boolean = false;
  currentMovieId: string;

  ngOnInit() {
    this.activateRoute.params.subscribe((params) => {
      const movieId = params['id'];
      this.currentMovieId = movieId;
      this.movieService.getMovieById(movieId).subscribe((movie) => {
        this.id = movie.id;
        this.name = movie.name;
        this.year = movie.year;
        this.imageUrl = movie.imageUrl;
        this.isPremium = movie.isPremium;
        this.details = movie.details;
      })
    })
  }

  onEditMovie() {    
    this.isSubmited = true;
    
    if(this.form.valid && this.isSubmited === true) {
      if(confirm('Do you want to edit this movie?')) {
        this.movieService.editMovie(this.currentMovieId, this.form.value);
        
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
