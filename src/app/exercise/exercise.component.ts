import { Component, OnInit } from '@angular/core';
import { FitnessService } from './../fitness.service';
import { Exercise } from '../../domain/exercise';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
  providers: [FitnessService]
})
export class ExerciseComponent implements OnInit {
  selectedExercise: Exercise;
  exercises: Exercise[];
  constructor(private fitnessService: FitnessService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.getExercises();
  }

  onSelect(exercise: Exercise): void {
    this.selectedExercise = exercise;
  }

  getExercises(): void {
    this.fitnessService
      .getExercises()
      .subscribe(exercises => this.exercises = exercises);
  }

  addExercise():void{
    this.selectedExercise = new Exercise(null, null, null, null, null, null, null);
  }


  delete(exercise: Exercise): void {
    this.fitnessService
      .deleteExercise(exercise._id)
      .subscribe(() => {
        this.exercises = this.exercises.filter(h => h !== exercise);
      });
  }
}


