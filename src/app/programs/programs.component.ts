import { Component, OnInit } from '@angular/core';
import { FitnessService } from '../fitness.service';
import { Observable } from 'rxjs/Observable';
import { Program } from '../../domain/program';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {

programs: Observable<Program[]>;

  constructor(private fitnessService: FitnessService, private authService: AuthService) { }

  ngOnInit() {
    this.programs = this.fitnessService.getPrograms();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
