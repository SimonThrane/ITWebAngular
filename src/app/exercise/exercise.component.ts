import { Component, OnInit } from '@angular/core';
import { FitnessService } from './../fitness.service';
import {Exercise} from '../../domain/exercise';
import { Observable } from 'rxjs/Observable';
import { Router }            from '@angular/router';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
  providers: [FitnessService]  
})
export class ExerciseComponent implements OnInit {
  exercises: Exercise[];
    constructor(private fitnessService: FitnessService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.getExercises();
  }
 
  gotoDetail(exercise: Exercise): void {
    let link = ['/detail', exercise.id];
    this.router.navigate(link);
  }

  getExercises(): void {
    this.fitnessService
        .getExercises()
        .then(exercises => this.exercises = exercises);
  }


  delete(exercise: Exercise): void {
    this.fitnessService
        .deleteExercise(exercise.id)
        .then(() => {
          this.exercises = this.exercises.filter(h => h !== exercise);
        });
  }
}


