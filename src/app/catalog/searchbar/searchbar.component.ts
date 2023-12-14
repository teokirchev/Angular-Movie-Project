import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
   searchText: string = '';
  
  updateSearchText(event: any) {
    this.searchText = event.target.value;
  }
}
