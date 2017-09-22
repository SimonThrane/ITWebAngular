import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Exercise} from '../domain/exercise';
import {environment} from '../environments/environment';

@Injectable()
export class FitnessService {
  private baseUrl = 'localhost:3000';
  private exerciseUrl= '/exercises';
  private programsUrl= '/programs';
  
  getExercise(id): Exercise{
      this.http.get(this.baseUrl + this.exerciseUrl)
  }
  constructor(private http: Http) { 
    if(environment.production){
      this.baseUrl = 'fitness-boys-api.herokuapp.com';
    }
  }

}
