import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-snackbar',
  templateUrl: './error-snackbar.component.html',
  styleUrls: ['./error-snackbar.component.css']
})
export class ErrorSnackbarComponent {

  @Input()
  errorMessage: string | null = null;
  
}
