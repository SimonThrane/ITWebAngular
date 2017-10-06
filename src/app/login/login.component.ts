import { Component, OnInit } from '@angular/core';
import { User } from '../../domain/User';
import { FitnessService } from '../fitness.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private fitnessService: FitnessService) { }
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
      this.fitnessService.
        login(this.user)
        // .error(function(err){
        //   this.formError = err;
        // })
        // .then(function(){

        // });
    
  }
}
