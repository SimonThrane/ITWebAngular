import { Component, OnInit, OnDestroy } from '@angular/core';
import { Program } from '../../domain/program';
import { Observable } from 'rxjs/Observable';
import { FitnessService } from '../fitness.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Exercise } from '../../domain/exercise';

@Component({
  selector: 'app-single-program',
  templateUrl: './single-program.component.html',
  styleUrls: ['./single-program.component.css']
})
export class SingleProgramComponent implements OnInit, OnDestroy {

  program: Program;
  routingSubscription: Subscription;
  programSubscription: Subscription;
  exerciseObservable: Observable<Exercise[]>;
  programId: number;

    constructor(private fitnessService: FitnessService, private route: ActivatedRoute) { }

    ngOnInit() {
      this.routingSubscription = this.route.params.subscribe(params => {
        this.programId = params.id;
        this.programSubscription = this.fitnessService.getProgram(this.programId).subscribe(program => {
          this.program = program;
        });
     });
     this.exerciseObservable = this.fitnessService.getExercises();
    }

    ngOnDestroy() {
      this.routingSubscription.unsubscribe();
      this.programSubscription.unsubscribe();
    }

    addExerciseToProgram(exercise: Exercise) {
      let mappedProgram = JSON.parse(JSON.stringify(this.program));
        mappedProgram.exercises = this.program.exercises.map((exercise) => exercise._id);
        mappedProgram.exercises.push(String(exercise._id));
        this.fitnessService.updateProgram(mappedProgram).subscribe(data => {
          if(this.program.exercises.filter(e => e._id === exercise._id).length === 0) {
            this.program.exercises.push(exercise);
          }
        });
    }

}
