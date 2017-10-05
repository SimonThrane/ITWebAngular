import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Exercise } from '../../domain/exercise';

@Component({
  selector: 'app-show-exercise',
  templateUrl: './show-exercise.component.html',
  styleUrls: ['./show-exercise.component.css']
})
export class ShowExerciseComponent implements OnInit {

  constructor() { }
  @Input() exercise: Exercise;
  @Output() onAddExercise = new EventEmitter<Exercise>();
  
  ngOnInit() {
  }

  saveExercise(): void{
      this.onAddExercise.emit();
  }

}
