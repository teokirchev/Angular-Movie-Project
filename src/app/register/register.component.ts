import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService) { }
  isSubmited: boolean = false;
  // email: string = '';
  // password: string = '';
  
  @ViewChild('registerForm') form: NgForm;
  
   

  onSubmitRegister() {
    const email = this.form.value.email;
    const password = this.form.value.password;

    this.isSubmited = true;

    this.form.reset();

    this.authService.register(email, password).subscribe({
      next: (res) => {
        console.log(res);
      }, 
      error: (err) => {
        console.log(err);
        
      }
    })
  }

  canExit() {
    if(this.form.dirty && this.isSubmited === false){
      return confirm('You have unsaved changes. Do you want to exit the page?')
    } else {
      return true;
    }
  }

}
