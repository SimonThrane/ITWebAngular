import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from '../../domain/exercise';

@Component({
  selector: 'app-show-exercise',
  templateUrl: './show-exercise.component.html',
  styleUrls: ['./show-exercise.component.css']
})
export class ShowExerciseComponent implements OnInit {

  constructor() { }
  @Input() exercise: Exercise;
  
  ngOnInit() {
  }

  saveExercise(): void{

  }

}
