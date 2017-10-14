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

@Injectable()
export class FitnessService {
  public baseUrl = 'http://localhost:3000/';
  private exerciseUrl = 'exercises';
  private programsUrl = 'programs';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  getExercise(id: string): Observable<Exercise> {
    const url = `${this.baseUrl + this.exerciseUrl}/${id}`;
    return this.http.get<Exercise>(url)
      .first();
  }

  deleteProgram(id: string): Observable<any> {
    const url = `${this.baseUrl + this.programsUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .first();
  }

  deleteExercise(id: string): Observable<any> {
    const url = `${this.baseUrl + this.exerciseUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .first();
  }

  getPrograms(): Observable<any> {
    return this.http.get(this.baseUrl + this.programsUrl)
      .first();
  }

  getProgram(id: number): Observable<Program> {
    const url = `${this.baseUrl + this.programsUrl}/${id}`;
    return this.http.get<Program>(url)
      .first()
  }

  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.baseUrl + this.exerciseUrl)
      .first();
  }

  createExercise(exercise: Exercise): Observable<Exercise> {
    return this.http
      .post<Exercise>(this.baseUrl + this.exerciseUrl, JSON.stringify(exercise), { headers: this.headers })
      .first();
  }

  createProgram(program: Program): Observable<Program> {
    console.log(JSON.stringify(program));
    return this.http
      .post<Program>(this.baseUrl + this.programsUrl, JSON.stringify(program), { headers: this.headers })
      .first();
  }

  updateProgram(program: Program): Observable<Program> {
    return this.http
      .put<Program>(this.baseUrl + this.programsUrl + "/" + program._id.toString(), JSON.stringify(program), { headers: this.headers })
      .first();
  }

  updateExercise(exercise: Exercise): Observable<Exercise> {
    return this.http
      .put<Exercise>(this.baseUrl + this.exerciseUrl + "/" + exercise._id.toString(), JSON.stringify(exercise), { headers: this.headers })
      .first();
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
