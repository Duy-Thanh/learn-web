import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { Structure } from '../structure';
import { slideInAnimation } from '../animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideInAnimation]
})
export class LoginComponent {
  email = "";
  password = "";

  prepareRoute(outlet: RouterOutlet) {
    return outlet && 
           outlet.activatedRouteData && 
           outlet.activatedRouteData['animation'];
  }

  structure = Structure;

  constructor(private _location: Location, private router: Router, private authService: AuthService) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url === '/' || val.url === '/home') {
          Structure.showHomepage = true;
          Structure.showAbout = false;
          Structure.showSupport = false;
          Structure.showCourses = false;
        } else if (val.url === '/about') {
          Structure.showAbout = true;
          Structure.showHomepage = false;
          Structure.showSupport = false;
          Structure.showCourses = false;
        } else if (val.url === '/support') {
          Structure.showSupport = true;
          Structure.showHomepage = false;
          Structure.showAbout = false;
          Structure.showCourses = false;
        } else if (val.url === '/courses') {
          Structure.showCourses = true;
          Structure.showHomepage = false;
          Structure.showAbout = false;
          Structure.showSupport = false;
        }
      }
    });
  }

  ngOnInit(): void {
    this.onWindowScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.querySelector('.navbar-custom');
    if (navbar) {
      if (window.pageYOffset > 50) {
        navbar.classList.add('bg-dark');
        navbar.classList.remove('navbar-transparent');
      } else {
        navbar.classList.remove('bg-dark');
        navbar.classList.add('navbar-transparent');
      }
    }
  }

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(response => {
      if (response.success) {
        console.log('Login successful');
        // Handle successful login (e.g., redirect to home page or show user-specific content)
      } else {
        console.log('Login failed');
        // Handle login failure (e.g., show error message to user)
      }
    });
  }

  backClicked() {
    this._location.back();
  }
}
