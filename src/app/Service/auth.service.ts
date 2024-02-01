import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged: boolean = false;

  constructor(
    private userService: UserService) { }

  login(email: string, password: string) {
    let user = this.userService.users.find((u) => u.email === email && u.password === password)
      if(user === undefined) {
        this.isLogged = false;
      }
       else{
         this.isLogged = true;
       }
    
    return user;
  };

  logout() :void {
    this.isLogged = false;
  };

  isAuthenticated() :boolean {
    return this.isLogged;
  }
};
