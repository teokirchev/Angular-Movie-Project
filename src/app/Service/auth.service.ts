import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../Models/AuthResponse';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged: boolean = false;

  constructor (
    private http: HttpClient
    ) {}

  user = new BehaviorSubject<User>(null);

  register(email: string, password: string) {
    const data = { email: email, password: password, returnSecureToken: true }
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEKG3bdIk0DeP4FEUGU3oC9tK2gK2vljs', data)
      .pipe(catchError(this.handleError), tap((res) => {
        this.handleCreateUser(res)
      }))
  }

  login(email: string, password: string) {
    const data = { email: email, password: password, returnSecureToken: true }
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEKG3bdIk0DeP4FEUGU3oC9tK2gK2vljs', data)
      .pipe(catchError(this.handleError), tap((res) => {
        this.handleCreateUser(res)
      }))
  };

  private handleCreateUser(res) {
    const expiresInTs = new Date().getTime() + Number(res.expiresIn) * 1000;
    const expiresIn = new Date(expiresInTs); 
    const user = new User(res.email, res.localId, res.idToken, expiresIn);
    this.user.next(user)
  }

  private handleError(err) {
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
