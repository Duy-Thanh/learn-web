import { Component, HostListener, OnInit } from '@angular/core';

/**
 * Animation import
 */

import { slideInAnimation } from '../animation';

import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Structure } from '../structure';

import { Location } from '@angular/common';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrl: './support.component.css',
  animations: [slideInAnimation]
})
export class SupportComponent implements OnInit {
  // When navigate to another webpages occurred, the prepareRoute() will be called
  // before navigate to the destinaton path. We can take advantage from that
  // to display our animation
  prepareRoute(outlet: RouterOutlet) {
    return outlet && 
           outlet.activatedRouteData && 
           outlet.activatedRouteData['animation'];
  }

  sections = [
    {
      title: "What is CyberCourse?",
      content: "CyberCourse is a small group of passionate members who want to bring everyone high-quality courses carefully selected by a team of leading experts at affordable prices. We always do our best so that our services can operate most effectively and satisfy customers.",
      isExpanded: false
    },
    {
      title: "How can I use the website?",
      content: "Firstly, you will need an account. If you don't have account, you can signup now!<br><br>After you have an account and logged in, you can browse our courses in Courses pages.<br><br>After you choose the reliability course, you may need to purchase it if that courses is not free, or you can learn immediately if that course is free",
      isExpanded: false
    },
    {
      title: "I have login problem, what should I do?",
      content: "Firstly, please make sure that your credentials is correctly.<br><br>Credentials is your email and your password, and both of them must be corrected when you login. Your email or your password may be incorrect, so you may want to check them first<br><br>After you sure that your credentials is corrected, you can try to login again immediately.<br><br>If you have this error persist, then contact to us",
      isExpanded: false
    },
    {
      title: "I can't create account, what should I do?",
      content: "Firstly, you need to check your browser settings. Make sure that JavaScript is enabled.<br><br>After you make sure that your browser settings is correctly, then check your Internet connection.<br><br>After check all and no problem, then may be our servers is overloading and you need to wait for an hour so that our engineers will fix the problem",
      isExpanded: false
    },
    {
      title: "I have problem when purchase a course",
      content: "Firstly, you need to check your browser settings. Make sure that JavaScript is enabled.<br><br>After you make sure that your browser settings is correctly, then check your Internet connection.<br><br>After check them and you can sure that they not causing problem, you need to sure that your payment methods was added.",
      isExpanded: false
    },
    {
      title: "I have more question, where should I contact?",
      content: "Of course, you can ask your question by email to us through: lolvaruslol123@admin.com",
      isExpanded: false
    }
  ]

  toggleExpand(index: number) {
    this.sections[index].isExpanded = !this.sections[index].isExpanded;
  }

  formatContent(content: string): string {
    return content.replace(/\n/g, '<br>');
  }
  
  // call after constructor()
  ngOnInit(): void {
    this.onWindowScroll();
  }

  // Event listener
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

  constructor(private _location: Location, private router: Router) {
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

  // This function will be called whenever back button click
  backClicked() {
    this._location.back();
  }
}

