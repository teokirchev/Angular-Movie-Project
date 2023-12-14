import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Input()
  all: number = 0;
  @Input()
  premium: number = 0;
  @Input()
  basic: number = 0;

  @Output()
  // създаваш евента
  selectedFilterButtonChange:EventEmitter<string> = new EventEmitter<string>();
  // създаваш променлива и слагаш default-на стойност ("all")
  selectedFilterButton: string = 'all';
  // change функцията, която пали евента
  onSelectedFilterButtonChange() {
    console.log('Selected filter button changed:', this.selectedFilterButton);
    this.selectedFilterButtonChange.emit(this.selectedFilterButton)
  }
}
