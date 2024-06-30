import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

// Import shared state class
import { Structure } from './structure';

// Import slideInAnimation to use animation when show webpage
import { slideInAnimation } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [slideInAnimation] // we need to declare animations here to applied animation when show webpage
})
export class AppComponent implements OnInit {
  // When navigate to another webpages occurred, the prepareRoute() will be called
  // before navigate to the destinaton path. We can take advantage from that
  // to display our animation
  prepareRoute(outlet: RouterOutlet) {
    return outlet && 
           outlet.activatedRouteData && 
           outlet.activatedRouteData['animation'];
  }
  
  // ngOnInit() will call after constructor()
  ngOnInit(): void {
      this.onWindowScroll();
  }

  // Event listener, replace to window.addEventListener in JS
  @HostListener('window:scroll', [])
  // Function to handle event when event triggered
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
  
  // We need declare variables so that component can be access,
  // due to html can't access shared instance directly
  structure = Structure;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url == '/' || val.url == '/home') {
          if (!Structure.showHomepage) {
            Structure.showHomepage = true;
          }
          Structure.showAbout = false;
          Structure.showSupport = false;
          Structure.showCourses = false;
          Structure.showLogin = false;
        } else if (val.url == '/about') {
          if (!Structure.showAbout) {
            Structure.showAbout = true;
          }
          Structure.showHomepage = false;
          Structure.showSupport = false;
          Structure.showCourses = false;
          Structure.showLogin = false;
        } else if (val.url == '/support') {
          if (!Structure.showSupport) {
            Structure.showSupport = true;
          }

          Structure.showHomepage = false;
          Structure.showAbout = false;
          Structure.showCourses = false;
          Structure.showLogin = false;
        } else if (val.url == '/courses') {
          if (!Structure.showCourses) {
            Structure.showCourses = true;
          }

          Structure.showHomepage = false;
          Structure.showAbout = false;
          Structure.showSupport = false;
          Structure.showLogin = false;
        } else if (val.url == '/login') {
          if (!Structure.showLogin) {
            Structure.showLogin = true;
          }

          Structure.showCourses = false;
          Structure.showHomepage = false;
          Structure.showAbout = false;
          Structure.showSupport = false;
        }
      }
    })
  }
}