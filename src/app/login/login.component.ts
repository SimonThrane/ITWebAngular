import { Component, OnInit } from '@angular/core';
import { User } from '../../domain/User';
import { FitnessService } from '../fitness.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private fitnessService: FitnessService, private authService: AuthService) { }
  user: any;
  formError: String;
  ngOnInit() {
    this.user = {email: null, password: null};
  }

  login(): void {
    this.authService.login(this.user);
  };
}
