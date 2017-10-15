import { Injectable } from '@angular/core';
import { User } from '../domain/User';
import { AuthResponse } from '../domain/AuthResponse';
import { FitnessService } from './fitness.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private tokenName = 'fitness-boys-token';

  constructor(private fitnessService: FitnessService, private http: HttpClient, private router: Router) { }

  private saveToken(token: string) {
    window.localStorage[this.tokenName] = token;
  }

  private getToken(): String {
      if (window.localStorage[this.tokenName]) {
          return window.localStorage[this.tokenName];
      } else {
          return '';
      }
  }

  public login(user: any): void {
    const url = `${this.fitnessService.baseUrl}auth/login`;
    this.http.post<AuthResponse>(url, user).subscribe(data => {
      this.saveToken(data.token);
      this.router.navigateByUrl('/programs');
    });
  };

  public logout(): void {
    window.localStorage.removeItem(this.tokenName);
    this.router.navigateByUrl('/home');
  };

  public register(user: User): boolean {
      const url = `${this.fitnessService.baseUrl}auth/register`;
      this.http.post<AuthResponse>(url, user).subscribe(data => {
      this.saveToken(data.token);
      this.router.navigateByUrl('/programs');
      return true;
    },
      // Errors will call this callback instead:
      (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
      } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
      return false;
    });
    return false;
  }

  public isLoggedIn():boolean {
      let token = this.getToken();
      if(token){
        var payload = JSON.parse(window.atob(token.split('.')[1]));
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
  };

  public currentUser(): User {
      if(this.isLoggedIn()){
        var token = this.getToken();
        var payload = JSON.parse(window.atob(token.split('.')[1]));
        return new User(null, null, payload.name, payload.email, null);
      }
    };

}
