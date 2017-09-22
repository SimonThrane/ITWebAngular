import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Exercise} from '../domain/exercise';
import {Program} from '../domain/program';
import {environment} from '../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FitnessService {
  private baseUrl = 'localhost:3000';
  private exerciseUrl= '/exercises';
  private programsUrl= '/programs';
  
  getExercise(id: number): Promise<Exercise> {
    const url = `${this.baseUrl + this.exerciseUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Exercise)
      .catch(this.handleError);
  }

  deleteProgram(id: number): Promise<void> {
    const url = `${this.baseUrl + this.programsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  deleteExercise(id: number): Promise<void> {
    const url = `${this.baseUrl + this.exerciseUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  getPrograms(): Promise<Program[]> {
    return this.http.get(this.baseUrl + this.programsUrl)
               .toPromise()
               .then(response => response.json().data as Program[])
               .catch(this.handleError);
  }

  getProgram(id: number): Promise<Program> {
    const url = `${this.baseUrl + this.programsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Program)
      .catch(this.handleError);
  }

  getExercises(): Promise<Exercise[]> {
    return this.http.get(this.baseUrl + this.exerciseUrl)
               .toPromise()
               .then(response => response.json().data as Exercise[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  constructor(private http: Http) { 
    if(environment.production){
      this.baseUrl = 'fitness-boys-api.herokuapp.com';
    }
  }

}
