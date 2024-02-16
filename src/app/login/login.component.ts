import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor( 
    private authService: AuthService,
    private activeRoute: ActivatedRoute ) {}

  @ViewChild('loginForm')form: NgForm
  isSubmited: boolean = false;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  ngOnInit() {
    this.activeRoute.queryParamMap.subscribe((queries) => {
      const logout = Boolean(queries.get('logout'))
      if(logout) {
        this.authService.logout()
        alert('You are now logged out.')
      }
    }) 
  }

  onLoginClicked() {
    const email = this.form.value.email;
    const password = this.form.value.password;

    this.isSubmited = true;
    this.form.reset();

    this.isLoading = true;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
      },
      error: (errMsg) => {
        this.isLoading = false;
        this.errorMessage = errMsg;
        this.hideErrorSnackbar();
      }
    });
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
