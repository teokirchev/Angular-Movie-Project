import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.css']
})
export class MovieRatingComponent {

  @Output()
  rateEvent = new EventEmitter<number>();

  stars = [1, 2, 3, 4, 5];
  selectedRating: number | undefined;

  rateMovie(rating: number): void {
    this.selectedRating = rating;
    this.rateEvent.emit(rating)
  }
}
