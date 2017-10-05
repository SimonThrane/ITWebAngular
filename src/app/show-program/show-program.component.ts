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

  ngOnInit() {  }

  deleteExercise(exercise: Exercise): void{
    this.onDeleteExercise.emit(exercise);
  }
  addExercise(exercise: Exercise):void
  {
    this.onAddExercise.emit(exercise);
    // console.log(exercise);
    // this.program.exercises.push(exercise);
  }
  saveProgram(program: Program){
    this.program.create_date = new Date();
    this.onCreateProgram.emit(this.program);
  }
  

}
