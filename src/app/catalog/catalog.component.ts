import { Component, OnInit } from '@angular/core';
import { Movie } from '../Models/Movie';
import { MovieService } from '../Service/movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit{

  constructor(
    private movieService: MovieService,
    private router: Router,
    private activeRoute: ActivatedRoute) {
  };

  allMovies: Movie[] = [] 
  
  all: number;
  premium: number;
  basic: number;
  updateCounts() {
    this.all = this.allMovies.length;
    this.premium = this.allMovies.filter(m => m.isPremium).length;
    this.basic = this.allMovies.filter(m => !m.isPremium).length;
  }
  
    
  selectedButtonChanged: string = 'all';

  searchedText: string = '';

  changeRadioButtonEvent(value: string) {
    this.selectedButtonChanged = value
  };
  onSearchClicked(value: string) {
    this.router.navigate(['/catalog'], { queryParams: {search: value}})
  }
  
  ngOnInit() {
    this.activeRoute.queryParamMap.subscribe((data) => {
      this.searchedText = data.get('search');
      
      if (this.searchedText === undefined || this.searchedText === null || this.searchedText === '') {
        this.movieService.getAllmovies().subscribe((movies) => {
          this.allMovies = movies;
          this.updateCounts();
        });
      } else {
        this.movieService.getAllmovies().subscribe((movies) => {
          this.allMovies = movies.filter((x) => x.name.toLowerCase()
          .includes(this.searchedText.toLowerCase()));
          this.updateCounts();
        })
      }
    });
  }
  
 
};
  