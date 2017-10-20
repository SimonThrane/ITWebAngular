import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Program } from '../../domain/program';
import { Subscription } from 'rxjs/Subscription';
import { FitnessService } from '../fitness.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from '../../domain/activity';

@Component({
  selector: 'app-log-activity',
  templateUrl: './log-activity.component.html',
  styleUrls: ['./log-activity.component.css']
})
export class LogActivityComponent implements OnInit, OnDestroy {
  programObservable: Observable<Program[]>;
  activity: Activity;
  activitySubscription: Subscription;
  activities: Activity[];
  
  constructor(private fitnessService: FitnessService, private router: Router) { }
  
  ngOnInit() {
    this.programObservable = this.fitnessService.getPrograms();
    // this.activitySubscription = this.fitnessService.getActivities().subscribe(activities => {
    //   this.activities = activities;
    // });
    console.log(this.activities);
    this.activity = new Activity(null, null, new Date);
  }

    
  ngOnDestroy() {
  }

  register() {
    console.log(this.activity);
    this.fitnessService.logActivity(this.activity).subscribe(data =>{
      this.router.navigate(["/home"]);
    });
  }
}

