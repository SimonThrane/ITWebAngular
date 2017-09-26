import { Component, OnInit } from '@angular/core';
import { FitnessService } from './../fitness.service';
import {Program} from '../../domain/program';
import { Observable } from 'rxjs/Observable';
import { Router }            from '@angular/router';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  programs: Program[];
  constructor(private fitnessService: FitnessService,
    private router: Router) { }

  ngOnInit() {
    this.getPrograms();    
  }

  getPrograms(): void {
    this.fitnessService
        .getPrograms()
        .then(programs => this.programs = programs);
  }


  delete(program: Program): void {
    this.fitnessService
        .deleteExercise(program.id)
        .then(() => {
          this.programs = this.programs.filter(h => h !== program);
        });
  }

}

