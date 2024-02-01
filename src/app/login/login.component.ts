import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor( 
    private authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute ) {}

  @ViewChild('email')email: ElementRef;
  @ViewChild('password')password: ElementRef;
 

  isSubmited: boolean = false;

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
    const email = this.email.nativeElement.value;
    const password = this.password.nativeElement.value;

    let user = this.authService.login(email, password);
    this.isSubmited = true;
    if(user === undefined){
      alert('The login credentials you have entered is not correct.');
    }
    else {
      alert(`Welcome ${user.email}. You are logged in.`)
      this.router.navigate(['/catalog']);
    } 
  } 

  canExit() {
    if((this.email.nativeElement.value || this.password.nativeElement.value) && this.isSubmited === false){
      return confirm('You have unsaved changes. Do you want to exit the page?')
    } else {
      return true;
    }
  }
}
