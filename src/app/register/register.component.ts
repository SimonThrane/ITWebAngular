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
  user: User;
  formError: String;
  ngOnInit() {
    this.user = new User(null, null, null, null, null);
  }


  onSubmit(): boolean{
    this.formError = "";
    if (!this.user.name || !this.user.email || !this.user.password) {
      this.formError = "All fields required, please try again";
      return false;
    } else {
      this.doRegister();
      return true;
    }
  };

  doRegister(): void {
    this.formError = "";
    this.authService
      .register(this.user)
      // .err(function(err){
      //   this.formError = err;
      // })
      // .then(function(){

      // });
  };



}
