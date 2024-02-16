import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../Models/User';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../Models/AuthResponse';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged: boolean = false;

  constructor(
    private userService: UserService,
    private http: HttpClient) { }

  register(email: string, password: string) {
    const data = { email: email, password: password, returnSecureToken: true }
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEKG3bdIk0DeP4FEUGU3oC9tK2gK2vljs', data)
      .pipe(catchError(this.handleError))
  }

  login(email: string, password: string) {
    const data = { email: email, password: password, returnSecureToken: true }
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEKG3bdIk0DeP4FEUGU3oC9tK2gK2vljs', data)
      .pipe(catchError(this.handleError))
  };

  handleError(err) {
    let errorMessage = 'An unknown error has occured.'
    console.log(err);

    if (!err.error || !err.error.error) {
      return throwError(() => errorMessage)
    }
    switch (err.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = 'This email is already exist.'
        break;
      case "OPERATION_NOT_ALLOWED":
        errorMessage = 'This operation is not allowed.'
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        errorMessage = 'Something went wrong. Please try again later.'
        break;
      case "INVALID_LOGIN_CREDENTIALS":
        errorMessage = 'Invalid email or password.'
        break;
      case "INVALID_EMAIL":
        errorMessage = 'Invalid email.'
        break;
      case "USER_DISABLED":
        errorMessage = 'The user account has been disabled.'
        break;
    }
    return throwError(() => errorMessage);
  }

  logout() {

  }
};
