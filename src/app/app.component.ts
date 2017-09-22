import { Component } from '@angular/core';
import {FitnessService} from './fitness.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FitnessService]
})
export class AppComponent {
}
