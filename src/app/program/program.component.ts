import { Component, OnInit } from '@angular/core';
import { FitnessService } from './../fitness.service';
import { Program } from '../../domain/program';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
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
      .subscribe(programs => {
        this.programs = programs;
        for (let program of this.programs) {
          for (let i = 0; i < program.exercises.length; i++) {
            if (program.exercises[i]) {
              this.fitnessService.getExercise(program.exercises[i] as string).subscribe(exercise => program.exercises[i] = exercise);
            }
          }
        }
      });
  }

  addExercise(exercise: Exercise): void {
    this.selectedProgram.exercises.push(exercise);
  }

  deleteExerciseFromProgram(exercise: Exercise): void {
    let index = this.selectedProgram.exercises.indexOf(exercise);
    if (index > -1) {
      this.selectedProgram.exercises.splice(index, 1);
    }
    this.fitnessService.updateProgram(this.selectedProgram).subscribe(program =>
      this.selectedProgram = program);
  }

  createProgram(program: Program): void{
    this.selectedProgram.exercises = this.selectedProgram.exercises.map((e) => e._id);
    if(program._id){
      this.fitnessService.updateProgram(this.selectedProgram).subscribe(()=>{
        this.selectedProgram = null;                        
      });
    }else{
      this.fitnessService.createProgram(this.selectedProgram).subscribe(() => {
        this.getPrograms();
        this.getExercises();
        this.selectedProgram = null;                
      });
    };
    }
  

  addProgram(): void{
    this.selectedProgram = new Program(null, new Array<any>(), null, null, null);
  }

  getExercises(): void {
    this.fitnessService
      .getExercises()
      .subscribe(exercises => this.exercises = exercises);
  }

  onSelect(program: Program): void {
    this.selectedProgram = program;
  }


  delete(program: Program): void {
    if(confirm("Are you sure you would delete the program?")){
      this.fitnessService
        .deleteProgram(program._id)
        .subscribe(() => {
          this.programs = this.programs.filter(h => h !== program);
        });
    }
  }
}

