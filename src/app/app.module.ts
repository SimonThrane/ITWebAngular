import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ProgramComponent } from './program/program.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { FitnessService } from './fitness.service'
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomeComponent } from './home/home.component';
import { ShowProgramComponent } from './show-program/show-program.component';
import { ShowExerciseComponent } from './show-exercise/show-exercise.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';



const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'programs', component: ProgramComponent },
  { path: 'programs/:id', component: ProgramComponent },
  { path: 'exercises', component: ExerciseComponent },
  { path: 'exercises/:id', component: ExerciseComponent },
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
    ProgramComponent,
    ExerciseComponent,
    TopBarComponent,
    HomeComponent,
    ShowProgramComponent,
    ShowExerciseComponent,
    RegisterComponent,
    LoginComponent
  ],
  providers: [FitnessService],
  bootstrap: [AppComponent]

})

export class AppModule { }
