import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent {
  movies = [
    {
      id: 1,
      name: 'The Godfather',
      year: '1999',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/af/The_Godfather%2C_The_Game.jpg',
      isPremium: true,
    },
    {
      id: 2,
      name: 'The Strongman',
      year: '2000',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/af/The_Godfather%2C_The_Game.jpg',
      isPremium: false,
    },
    {
      id: 3,
      name: 'The Nun',
      year: '1979',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/af/The_Godfather%2C_The_Game.jpg',
      isPremium: false,
      
    },
  ]

  @Input()
  all = this.movies.length;
  @Input()
  premium = this.movies.filter(m => m.isPremium === true).length;
  @Input()
  basic = this.movies.filter(m => m.isPremium === false).length;

  selectedFilterButton: string = 'all';
  onFilterChanged(value: string) {
    console.log('sdafg');
    
    this.selectedFilterButton = value
  }
  
}