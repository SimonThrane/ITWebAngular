import { Injectable } from '@angular/core';
import { Exercise } from '../domain/exercise';
import { Program } from '../domain/program';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../domain/User';
import { AuthResponse } from '../domain/AuthResponse';

@Injectable()
export class FitnessService {
  private baseUrl = 'http://fitness-boys-api.herokuapp.com/';
  private exerciseUrl = 'exercises';
  private programsUrl = 'programs';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private tokenName = 'fitness-boys-token';

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
    
  getExercise(id: string): Observable<Exercise> {
    const url = `${this.baseUrl + this.exerciseUrl}/${id}`;
    return this.http.get<Exercise>(url)
      .first()
      .catch(this.handleError);
  }

  public login(user: User): void {
    const url = `${this.baseUrl}/login`;    
    this.http.post<AuthResponse>(url, user).subscribe(data => {
      this.saveToken(data.token);
    });
  };

  public logout(): void {
    window.localStorage.removeItem(this.tokenName);
  };

  public register(user: User): boolean {
      const url = `${this.baseUrl}/register`;
      this.http.post<AuthResponse>(url, user).subscribe(data => {
      this.saveToken(data.token);
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

  deleteProgram(id: string): Observable<void> {
    const url = `${this.baseUrl + this.programsUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .first()
      .catch(this.handleError);
  }

  deleteExercise(id: string): Observable<void> {
    const url = `${this.baseUrl + this.exerciseUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .first()
      .catch(this.handleError);
  }

  getPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(this.baseUrl + this.programsUrl)
      .first()
      .catch(this.handleError);
  }

  getProgram(id: number): Observable<Program> {
    const url = `${this.baseUrl + this.programsUrl}/${id}`;
    return this.http.get<Program>(url)
      .first()
      .catch(this.handleError);
  }

  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.baseUrl + this.exerciseUrl)
      .first()
      .catch(this.handleError);
  }

  createExercise(exercise: Exercise): Observable<Exercise> {
    return this.http
      .post<Exercise>(this.baseUrl + this.exerciseUrl, JSON.stringify(exercise), { headers: this.headers })
      .first()
      .catch(this.handleError);
  }

  createProgram(program: Program): Observable<Program> {
    console.log(JSON.stringify(program));
    return this.http
      .post<Program>(this.baseUrl + this.programsUrl, JSON.stringify(program), { headers: this.headers })
      .first()
      .catch(this.handleError);
  }

  updateProgram(program: Program): Observable<Program> {
    return this.http
      .put<Program>(this.baseUrl + this.programsUrl + "/" + program._id.toString(), JSON.stringify(program), { headers: this.headers })
      .first()
      .catch(this.handleError);
  }

  updateExercise(exercise: Exercise): Observable<Exercise> {
    return this.http
      .put<Exercise>(this.baseUrl + this.exerciseUrl + "/" + exercise._id.toString(), JSON.stringify(exercise), { headers: this.headers })
      .first()
      .catch(this.handleError);
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Observable.of(error.message || error);
  }
  constructor(private http: HttpClient) {
    // if (environment.production) {
    //   this.baseUrl = 'http://fitness-boys-api.herokuapp.com/';
    // }
  }

}
