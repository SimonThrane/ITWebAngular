import { Component, OnInit } from '@angular/core';
import { User } from '../../domain/User';
import { FitnessService } from '../fitness.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fitnessService: FitnessService, private authService: AuthService) { }
  user: any;
  formError: String;
  ngOnInit() {
    this.user = {name: null, email: null, password: null};
  }

  register() {
    this.authService.register(this.user);
  }

}
