import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-students-teachers',
  templateUrl: './students-teachers.component.html',
  styleUrls: ['./students-teachers.component.scss']
})
export class StudentsTeachersComponent {
  role!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRole();

  }

  getRole(): void {
    const path = this.route.snapshot.url[0].path;
    if (path === 'students') {
      this.role = 'students';
    } else if (path === 'teachers') {
      this.role = 'teachers';
    }
  }
}
