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

  movies: Movie[] = this.movieService.getAllmovies();
  

  all = this.movies.length;
  premium = this.movies.filter(m => m.isPremium).length;
  basic = this.movies.filter(m => m.isPremium === false).length;
    
  selectedButtonChanged: string = 'all';

  searchedText: string = '';

  changeRadioButtonEvent(value: string) {
    this.selectedButtonChanged = value
  };
  onSearchClicked(value: string) {
    this.router.navigate(['/catalog'], { queryParams: {search: value}})
  }

  // ngOnInit() {
  //   this.activeRoute.queryParamMap.subscribe((data) => {
  //     this.searchedText = data.get('search')

  //     if(this.searchedText === undefined || this.searchedText === null || this.searchedText === '') {
  //       this.movieService.getAllmovies();
  //     } else {
  //       this.movies.filter((x) => x.name.toLowerCase()
  //       .includes(this.searchedText.toLowerCase()));
  //     }
  //   })
  // };
  
  ngOnInit() {
    this.activeRoute.queryParamMap.subscribe((data) => {
      this.searchedText = data.get('search');
      
      if (this.searchedText === undefined || this.searchedText === null || this.searchedText === '') {
        this.movies = this.movieService.getAllmovies();
      } else {
        this.movies = this.movieService.getAllmovies()
        .filter((x) => x.name.toLowerCase()
        .includes(this.searchedText.toLowerCase()));
      }
    });
  }
};
  