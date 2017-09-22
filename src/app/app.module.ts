import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ProgramComponent } from './program/program.component';
import { ExerciseComponent } from './exercise/exercise.component';



const appRoutes: Routes = [
  { path: 'programs', component: ProgramComponent },
  { path: 'programs/:id',      component: ProgramComponent },
  { path: 'exercises',      component: ExerciseComponent },
  { path: 'exercises/:id',      component: ExerciseComponent },
  { path: '',
    redirectTo: '/programs',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    BrowserModule, 
    HttpModule,   
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
    ExerciseComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})

export class AppModule { }
