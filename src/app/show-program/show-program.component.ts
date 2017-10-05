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
  @Output() onDeleteExercise = new EventEmitter<Exercise>();
  @Output() onCreateProgram = new EventEmitter<Program>();
    
  constructor() { }

  ngOnInit() {

  }
  deleteExercise(exercise: Exercise): void{
    this.onDeleteExercise.emit(exercise);
  }
  addExercise(exercise: Exercise):void
  {
    this.program.exercises.push(exercise);
    this.onAddExercise.emit(exercise);
  }
  createProgram(program: Program){
    this.onCreateProgram.emit(program);
  }
  

}
