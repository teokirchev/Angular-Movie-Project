import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.css']
})
export class CatalogItemComponent {
  @Input()
  movie : {
        id: number,
        name: string,
        year: string,
        imageUrl: string,
        isPremium: boolean,
  } 
}
