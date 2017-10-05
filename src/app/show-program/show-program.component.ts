import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Program } from '../../domain/program';
import { Exercise } from '../../domain/exercise';

@Component({
  selector: 'app-show-program',
  templateUrl: './show-program.component.html',
  styleUrls: ['./show-program.component.css']
})
export class ShowProgramComponent implements OnInit {
  @Input() program: Program;
  @Input() exercises: Exercise[];
  @Output() onAddExercise = new EventEmitter<Exercise>();
  constructor() { }

  ngOnInit() {

  }

  addExercise(exercise: Exercise):void
  {
    this.onAddExercise.emit(exercise);
  }

}
