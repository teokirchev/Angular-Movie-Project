import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/Models/Movie';
import { MovieService } from 'src/app/Service/movie.service';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.css']
})
export class CatalogItemComponent {

  constructor(private router: Router, private movieService: MovieService) {

  }

  @Input()
  movie: Movie

  
}
