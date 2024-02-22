import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../Models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
  ) { }

  isLoggedIn: boolean = false;
  private userSubject: Subscription;

  ngOnInit() {
    this.userSubject = this.authService.user.subscribe((user: User) => {
      console.log(user);
      this.isLoggedIn = user ? true : false; 
    })
  }
  ngOnDestroy() {
    this.userSubject.unsubscribe();
  }

}
