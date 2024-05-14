import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../Models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService
  ) { }

  isLoggedIn: boolean = false;
  userEmail: string;

  private userSubject: Subscription;

  
  ngOnInit() {
    this.userSubject = this.authService.user.subscribe((user: User) => {
      this.isLoggedIn = user ? true : false;
      this.userEmail = user.email;
    })
  }

  onLogout() {
    this.authService.logout()
  }

  ngOnDestroy() {
    this.userSubject.unsubscribe();
  }

}
