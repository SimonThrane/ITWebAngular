import { Component, OnInit } from '@angular/core';
import { FitnessService } from './../fitness.service';
import {Program} from '../../domain/program';
import { Observable } from 'rxjs/Observable';
import { Router }            from '@angular/router';
import { Exercise } from '../../domain/exercise';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  programs: Program[];
  selectedProgram: Program;
  exercises: Exercise[];
  constructor(private fitnessService: FitnessService,
    private router: Router) { }

  ngOnInit() {
    this.getPrograms();   
    this.getExercises(); 
  }

  getPrograms(): void {
    this.fitnessService
        .getPrograms()
        .then(programs => this.programs = programs);
  }

  addExercise(exercise: Exercise): void{
    console.log(exercise);
  }

  getExercises(): void {
    this.fitnessService
        .getExercises()
        .then(exercises => this.exercises = exercises);
  }

  onSelect(program: Program): void {
    this.selectedProgram = program;
    for(let i =0; i < program.exercises.length; i++){
      if(program.exercises[i]){
        this.fitnessService.getExercise(program.exercises[i] as any).then(exercise => program.exercises[i] = exercise);        
      }
    }
  }


  delete(program: Program): void {
    this.fitnessService
        .deleteExercise(program.id)
        .then(() => {
          this.programs = this.programs.filter(h => h !== program);
        });
  }

}

