import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';

import { SupportComponent } from './support/support.component';
import { CoursesComponent } from './courses/courses.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { animation } from '@angular/animations';
import { AppComponent } from './app.component';

// Routes will responsible for define path to sub-pages
const routes: Routes = [
  /**
   * Path is equal to /{path}
   * 
   * For example: ${url}:${port} = localhost:8080 and ${path} = 'about'
   * 
   * So that, we have full URL is: ${url}:${port}/${path} => localhost:8080/about
   */

  /**
   * We have neccessary parameters in here:
   * 
   * path: path to sub-pages
   * component: Selector that point to component need to show when user navigate to the path
   * data: Can contains more data, for example: animation, etc.
   */
  { path: 'about', component: AboutComponent, data: { animation: 'AboutPage' } },
  { path: 'support', component: SupportComponent, data: { animation: 'SupportPage' } },
  { path: 'courses', component: CoursesComponent, data: { animation: 'CoursesPage' } },
  { path: 'login', component: LoginComponent, data: { animation: 'LoginPage' } },
  { path: 'signup', component: SignupComponent, data: { animation: 'RegisterPage' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
