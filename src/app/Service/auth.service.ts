import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../Models/AuthResponse';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  user = new BehaviorSubject<User>(null);
  private tokenExpireTimer: any;

  register(email: string, password: string) {
    const data = { email: email, password: password, returnSecureToken: true }
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKEY, data)
      .pipe(catchError(this.handleError), tap((res) => {
        this.handleCreateUser(res)
      }))
  }

  login(email: string, password: string) {
    const data = { email: email, password: password, returnSecureToken: true }
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKEY, data)
      .pipe(catchError(this.handleError), tap((res) => {
        this.handleCreateUser(res)
      }))
  };

  logout() {
    this.user.next(null);
    this.router.navigate(['/login'])
    localStorage.removeItem('user');

    // зачистваме таймера ако някой натисне logout бутона
    if (this.tokenExpireTimer) {
      clearTimeout(this.tokenExpireTimer);
    }
    this.tokenExpireTimer = null;
  }

  private handleCreateUser(res) {
    const expiresInTs = new Date().getTime() + Number(res.expiresIn) * 1000;
    const expiresIn = new Date(expiresInTs);
    const user = new User(res.email, res.localId, res.idToken, expiresIn);
    this.user.next(user);

    this.autoLogout(res.expiresIn * 1000);
    localStorage.setItem('user', JSON.stringify(user));
  }

  autoLogin() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return;
    }
    const loggedUser = new User(user.email, user.id, user._token, user._expiresIn);
    if (loggedUser.token) {
      this.user.next(loggedUser);
      const timer = new Date(user._expiresIn).getTime() - new Date().getTime();
      this.autoLogout(timer);
    }
  }

  getCurrentUser() {
    return this.user.asObservable();
  }

  // можеш да тестваш autologout като смениш времето на таймера expiresTime с 3000мс
  autoLogout(expireTime: number) {
    this.tokenExpireTimer = setTimeout(() => {
      this.logout();
    }, expireTime);
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
};
