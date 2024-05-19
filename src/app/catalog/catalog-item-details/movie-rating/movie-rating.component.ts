import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.css']
})
export class MovieRatingComponent {

  @Output()
  rateEvent: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  closeRateEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  stars = [1, 2, 3, 4, 5];
  selectedRating: number | undefined;

  closeRateMovie() {
    this.closeRateEvent.emit(false)
  }
  rateMovie(rating: number): void {
    this.selectedRating = rating
    this.rateEvent.emit(rating);
    
  }

  selectRating(rating: number): void {
    if (this.selectedRating === rating) {
      // If the same star is clicked again, unselect it
      this.selectedRating = undefined;
    } else {
      this.selectedRating = rating;
    }
  }
}
