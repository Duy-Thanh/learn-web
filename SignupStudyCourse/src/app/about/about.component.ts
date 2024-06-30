import { Component, HostListener, OnInit } from '@angular/core';

/**
 * Animation import
 */
import { slideInAnimation } from '../animation';

import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

// Import neccessary state variable
import { Structure } from '../structure';

// Location will be imported here to make sure that our website known where they are?
//
// Nguyen Duy Thanh - 06/06/2024
import { Location } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  animations: [slideInAnimation]
})
export class AboutComponent implements OnInit {
  // When navigate to another webpages occurred, the prepareRoute() will be called
  // before navigate to the destinaton path. We can take advantage from that
  // to display our animation
  //
  // Nguyen Duy Thanh (SegFault.e404) - 01/06/2024
  prepareRoute(outlet: RouterOutlet) {
    return outlet && 
           outlet.activatedRouteData && 
           outlet.activatedRouteData['animation'];
  }
  
  // call after constructor()
  ngOnInit(): void {
    this.onWindowScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // We can see that very similar, right :)))
    const navbar = document.querySelector('.navbar-custom');
    if (navbar) {
      // Since JavaScript cannot be accepted by Angular,
      // we need to convert JS to Angular to use them
      //
      // Fortunately, Angular have Event Listener native supported. Good :)
      //
      // Nguyen Duy Thanh - 01/06/2024
      //
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
  //
  // Nguyen Duy Thanh - 01/06/2024
  structure = Structure;

  constructor(private _location: Location, private router: Router) {
    // Subscribe event router when navigate
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url == '/' || val.url == '/home') {
          if (!Structure.showHomepage) {
            Structure.showHomepage = true;
          }

          Structure.showAbout = false;
          Structure.showSupport = false;
          Structure.showCourses = false;
        } else if (val.url == '/about') {
          if (!Structure.showAbout) {
            Structure.showAbout = true;
          }
          Structure.showHomepage = false;
          Structure.showSupport = false;
          Structure.showCourses = false;
        } else if (val.url == '/support') {
          if (!Structure.showSupport) {
            Structure.showSupport = true;
          }

          Structure.showHomepage = false;
          Structure.showAbout = false;
          Structure.showCourses = false;
        } else if (val.url == '/courses') {
          if (!Structure.showCourses) {
            Structure.showCourses = true;
          }

          Structure.showHomepage = false;
          Structure.showAbout = false;
          Structure.showSupport = false;
        }
      }
    })
  }

  backClicked() {
    this._location.back();
  }
}
