import { Component } from '@angular/core';
import { slideInAnimation } from '../animation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  animations: [slideInAnimation]
})
export class SignupComponent {

}
