import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../Service/auth.service';
import { Observable } from 'rxjs';
import { AuthResponse } from '../Models/AuthResponse';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService) { }
  isSubmited: boolean = false;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  
  @ViewChild('registerForm') form: NgForm;

  onSubmitRegister() {
    const email = this.form.value.email;
    const password = this.form.value.password;

    this.isSubmited = true;
    this.form.reset();

    this.isLoading = true;
    
    this.authService.register(email, password).subscribe({
      next: (res) => {
        this.isLoading = false;
      }, 
      error: (errMsg) => {
        this.isLoading = false;
        this.errorMessage = errMsg
        this.hideErrorSnackbar();
      }
    })
  }
  
  hideErrorSnackbar() {
    setTimeout(() => {
      this.errorMessage = null;
    }, 4000);
  }
 
  canExit() {
    if(this.form.dirty && this.isSubmited === false){
      return confirm('You have unsaved changes. Do you want to exit the page?')
    } else {
      return true;
    }
  }

}
