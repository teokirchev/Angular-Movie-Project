import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../Models/User';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../Models/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged: boolean = false;
  

  constructor(
    private userService: UserService,
    private http: HttpClient) { }

    register(email: string, password: string) {
      const data = {email: email, password: password, returnSecureToken: true}
      return this.http.post<AuthResponse> (
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyBEKG3bdIk0DeP4FEUGU3oC9tK2gK2vljs'
        , data )
    }

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
