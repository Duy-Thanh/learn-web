import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses = [
    {
      id: 1,
      title: 'Introduction to Programming',
      description: 'Learn the basics of programming using Python.',
      duration: '4 weeks',
      image: 'assets/course1.jpg'
    },
    {
      id: 2,
      title: 'Web Development',
      description: 'Master the fundamentals of web development with HTML, CSS, and JavaScript.',
      duration: '6 weeks',
      image: 'assets/course2.jpg'
    },
    {
      id: 3,
      title: 'Data Science',
      description: 'Get started with data analysis and machine learning.',
      duration: '8 weeks',
      image: 'assets/course3.jpg'
    },
    {
      id: 4,
      title: 'C For Beginner',
      description: 'Get started with C programming language',
      duration: '6 weeks',
      image: 'assets/course3.jpg'
    },
    {
      id: 5,
      title: 'C++ For Beginner',
      description: 'Get started with C++ programming language',
      duration: '8 weeks',
      image: 'assets/course2.jpg'
    },
    {
      id: 6,
      title: 'Python For Beginner',
      description: 'Get started with Python language',
      duration: '6 weeks',
      image: 'assets/course1.jpg'
    },
    {
      id: 7,
      title: 'C Advanced Programming',
      description: 'Deep dive into C programming language',
      duration: '8 weeks',
      image: 'assets/course3.jpg'
    },
    {
      id: 8,
      title: 'C++ Advanced Programming',
      description: 'Deep dive into C++ programming language',
      duration: '10 weeks',
      image: 'assets/course1.jpg'
    },
    {
      id: 9,
      title: 'Python Advanced Programming',
      description: 'Deep dive into Python language',
      duration: '12 weeks',
      image: 'assets/course2.jpg'
    }
  ];

  constructor(private location: Location) { }

  ngOnInit(): void { }

  backClicked() {
    this.location.back();
  }

  enroll(courseId: number) {
    console.log('Enrolled in course:', courseId);
  }
}
