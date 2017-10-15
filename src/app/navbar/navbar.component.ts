import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  get currentUser(): string {
      return this.authService.currentUser().name;
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
