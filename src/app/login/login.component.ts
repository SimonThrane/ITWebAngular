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
  user: User;
  formError: String;
  ngOnInit() {
    this.user = new User(null, null, null, null, null);
  }

  onSubmit(): boolean{
    this.formError = "";
    if (!this.user.email || !this.user.password) {
      this.formError = "All fields required, please try again";
      return false;
    } else {
      this.login();
      return true;
    }
  };

  login(): void {
      this.formError = "";
      this.authService.
        login(this.user)
        // .error(function(err){
        //   this.formError = err;
        // })
        // .then(function(){

        // });

  }
}
