import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {StudentService} from '../services/student.service';

interface Student {
  id: number;
  name: string;
  average: number;
  alternant?: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pageTitle = 'Démo';
  students: Student[];
  message = '';
  rawHtml = false;

  constructor(private router: Router, private studentService: StudentService) {
    this.studentService.findAll().subscribe(data => {
      this.students = data;
      console.log(this.students);
    });

    this.countAlternant();
  }

  onClick(student: Student) {
    this.router.navigate(['/student/', student.id]);
  }

  onChange(nom: string) {
    for (let i = 0; i < this.students.length; i++) {
      if (nom === this.students[i].name) {
        this.students[i].alternant = !this.students[i].alternant;
        break;
      }
    }
    this.countAlternant();
  }

  countAlternant() {
    let numAlternant = 0;
    if (this.students) {
      this.students.forEach(student => {
        if (student.alternant) {
          numAlternant++;
        }
      });
      this.message = numAlternant + ' étudiants en alternance';
    }
  }
}
