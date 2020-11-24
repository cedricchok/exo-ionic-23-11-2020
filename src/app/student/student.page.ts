import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Student} from '../models/Student';
import {StudentService} from '../services/student.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {

  id: string;
  currentStudent: Student;

  constructor(
      private activatedRoute: ActivatedRoute,
      private route: Router,
      private studentService: StudentService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      // console.log(this.id);

      this.studentService.findById(this.id).subscribe(data => {
        console.log(data);
        this.currentStudent = data;
        console.log(this.currentStudent.name);
      });
    });
  }

  onHome() {
    this.route.navigate(['/home']);
  }

}
