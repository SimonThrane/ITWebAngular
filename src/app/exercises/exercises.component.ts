import { Component, OnInit } from '@angular/core';
import { FitnessService } from '../fitness.service';
import { Exercise } from '../../domain/exercise';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  exercises: Exercise[];
  exerciseAdd: any;
  exerciseSubscription: Subscription;

  constructor(private fitnessService: FitnessService) { }

  ngOnInit() {
    this.exercises = new Array<Exercise>();
    this.exerciseSubscription = this.fitnessService.getExercises().subscribe(exercises => {
      this.exercises = exercises;
    });
    this.exerciseAdd = {name: null, description: null, isRepetition: false, reps: null, sets: null, time: null};
  }

  addExercise() {
    this.fitnessService.createExercise(this.exerciseAdd).subscribe(data => {
      this.exercises.push(this.exerciseAdd);
      this.exerciseAdd = {name: null, description: null, isRepetition: false, reps: null, sets: null, time: null};
    });
  }

  deleteExercise(exercise) {
    this.fitnessService.deleteExercise(exercise._id).subscribe(data => {
      this.exercises = this.exercises.filter(e => e._id !== exercise._id);
    });
  }

}
