import { Injectable } from '@angular/core';
import { Exercise } from '../domain/exercise';
import { Program } from '../domain/program';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class FitnessService {
  private baseUrl = '/api';
  private exerciseUrl = '/exercises/';
  private programsUrl = '/programs/';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  getExercise(id: string): Promise<Exercise> {
    const url = `${this.baseUrl + this.exerciseUrl}/${id}`;
    return this.http.get<Exercise>(url)
      .toPromise()
      .catch(this.handleError);
  }

  deleteProgram(id: string): Promise<void> {
    const url = `${this.baseUrl + this.programsUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  deleteExercise(id: string): Promise<void> {
    const url = `${this.baseUrl + this.exerciseUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  getPrograms(): Promise<Program[]> {
    return this.http.get<Program[]>(this.baseUrl + this.programsUrl)
      .toPromise()
      .catch(this.handleError);
  }

  getProgram(id: number): Promise<Program> {
    const url = `${this.baseUrl + this.programsUrl}/${id}`;
    return this.http.get<Program>(url)
      .toPromise()
      .catch(this.handleError);
  }

  getExercises(): Promise<Exercise[]> {
    return this.http.get<Exercise[]>(this.baseUrl + this.exerciseUrl)
      .toPromise()
      .catch(this.handleError);
  }

  createExercise(exercise: Exercise): Promise<Exercise> {
    return this.http
      .post<Exercise>(this.baseUrl + this.exerciseUrl, JSON.stringify({ exercise: exercise }), { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  createProgram(program: Program): Promise<Program> {
    return this.http
      .post<Program>(this.baseUrl + this.programsUrl, JSON.stringify({ program: program }), { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  updateProgram(program: Program): Promise<Program> {
    return this.http
      .post<Program>(this.baseUrl + this.programsUrl + program.id.toString(), JSON.stringify({ program: program }), { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  updateExercise(exercise: Exercise): Promise<Exercise> {
    return this.http
      .post<Exercise>(this.baseUrl + this.exerciseUrl + exercise.id.toString(), JSON.stringify({ exercise: exercise }), { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  constructor(private http: HttpClient) {
    if (environment.production) {
      this.baseUrl = 'http://fitness-boys-api.herokuapp.com/';
    }
  }

}
