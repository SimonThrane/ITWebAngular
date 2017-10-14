import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { FitnessService } from './fitness.service'
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { IsLoggedInGuard } from './is-logged-in.guard';
import { AuthService } from './auth.service';
import { ProgramsComponent } from './programs/programs.component';
import { SingleProgramComponent } from './single-program/single-program.component';



const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'programs', component: ProgramsComponent },
  { path: 'programs/:id', component: SingleProgramComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
    // other imports here
  ],

  declarations: [
    AppComponent,
    NavbarComponent,
    MainContentComponent,
    TopBarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ProgramsComponent,
    SingleProgramComponent
  ],
  providers: [
    FitnessService,
    IsLoggedInGuard,
    AuthService
  ],
  bootstrap: [AppComponent]

})

export class AppModule { }
