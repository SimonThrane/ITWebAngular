import { Component, OnInit, OnDestroy } from '@angular/core';
import { FitnessService } from '../fitness.service';
import { Observable } from 'rxjs/Observable';
import { Program } from '../../domain/program';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit, OnDestroy {

  programsSubscription: Subscription;
  programs: Program[];
  programAdd: any;

  constructor(private fitnessService: FitnessService, private authService: AuthService) { }

  ngOnInit() {
    this.programsSubscription = this.fitnessService.getPrograms().subscribe(programs => {
      this.programs = programs;
    });
    this.programAdd = { name: null, category: null}
  }

  ngOnDestroy() {
    this.programsSubscription.unsubscribe();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  deleteProgram(program) {
    this.fitnessService.deleteProgram(program._id).subscribe(data => {
      let index = this.programs.indexOf(program._id);
      this.programs.splice(index, 1);
    });
  }

  addProgram() {
    this.fitnessService.createProgram(this.programAdd).subscribe(data => {
      this.programAdd.create_date = new Date();
      this.programs.push(this.programAdd);
      this.programAdd = {name: null, category: null};
    });
  }

}
