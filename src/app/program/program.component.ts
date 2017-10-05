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
    this.selectedProgram.exercises.push(exercise);
    // this.fitnessService.updateProgram(this.selectedProgram).then(
    //   program => this.selectedProgram = program
    // );
  }

  deleteExerciseFromProgram(exercise: Exercise): void{
    console.log(exercise);
    let index = this.selectedProgram.exercises.indexOf(exercise);
    if(index > -1){
      this.selectedProgram.exercises.splice(index, 1);
    }
    this.fitnessService.updateProgram(this.selectedProgram).then(program =>
      this.selectedProgram = program);
  }

  createProgram(program: Program): void{
    this.selectedProgram.exercises = this.selectedProgram.exercises.map((e) => e._id); 
    console.log(this.selectedProgram);
    if(program._id){
      console.log("Update");
      this.fitnessService.updateProgram(this.selectedProgram).then(program => this.selectedProgram = program);      
    }else{
      console.log("CreateNew");      
      this.fitnessService.createProgram(this.selectedProgram).then(program => {this.programs.push(program); console.log(program)});            
    }
  }

  addProgram(): void{
    this.selectedProgram = new Program(null, new Array<any>(), null, null, null);
  }

  getExercises(): void {
    this.fitnessService
        .getExercises()
        .then(exercises => this.exercises = exercises);
  }

  onSelect(program: Program): void {
    console.log(program);    
    this.selectedProgram = program;
    for(let i =0; i < program.exercises.length; i++){
      if(program.exercises[i]){
        this.fitnessService.getExercise(program.exercises[i] as any).then(exercise => program.exercises[i] = exercise);        
      }
    }
  }


  delete(program: Program): void {
    this.fitnessService
        .deleteExercise(program._id)
        .then(() => {
          this.programs = this.programs.filter(h => h !== program);
        });
  }

}

