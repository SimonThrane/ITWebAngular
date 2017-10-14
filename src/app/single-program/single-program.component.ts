import { Component, OnInit, OnDestroy } from '@angular/core';
import { Program } from '../../domain/program';
import { Observable } from 'rxjs/Observable';
import { FitnessService } from '../fitness.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-single-program',
  templateUrl: './single-program.component.html',
  styleUrls: ['./single-program.component.css']
})
export class SingleProgramComponent implements OnInit, OnDestroy {

  programObservable: Observable<Program>;
  routingSubscription: Subscription;

    constructor(private fitnessService: FitnessService, private route: ActivatedRoute) { }

    ngOnInit() {
      this.routingSubscription = this.route.params.subscribe(params => {
        let id = params.id;
        this.programObservable = this.fitnessService.getProgram(id);
     });
    }

    ngOnDestroy() {
      this.routingSubscription.unsubscribe();
    }

}
