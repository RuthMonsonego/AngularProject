import { Component, Input } from '@angular/core';
import { Student } from '../student-list/student.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  @Input() student!: Student;

}
