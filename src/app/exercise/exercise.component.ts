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
      .then(exercises => this.exercises = exercises);
  }

  addExercise():void{
    this.selectedExercise = new Exercise(null, null, null, null, null, null, null);
  }

  createExercise():void{
    if(this.selectedExercise._id){
      this.fitnessService.updateExercise(this.selectedExercise)
      .then(exercise => this.selectedExercise = exercise);
    }else{
      this.fitnessService.createExercise(this.selectedExercise)
      .then(exercise => this.exercises.push(exercise));
    }
  }

  delete(exercise: Exercise): void {
    this.fitnessService
      .deleteExercise(exercise._id)
      .then(() => {
        this.exercises = this.exercises.filter(h => h !== exercise);
      });
  }
}


