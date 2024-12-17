import { Component, OnInit } from '@angular/core';
import { studentService } from '../modules/student/student.service';
import { Student } from '../modules/student/student-list/student.model';
import { Observable, from, interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.scss']
})
export class ObservableComponent implements OnInit {

  x: string = '';
  x1: string = '';
  y: string = '';
  y1: string = '';
  z: string[] = [];
  z1: string[] = [];
  students: Student[] = [];
  source: Observable<string> = new Observable();
  studentsNames: Observable<string> = new Observable();
  emailObservable: Observable<any> = new Observable();
  emailObservable1: Observable<any> = new Observable();

  timerOne: Observable<string> = new Observable(obs => {
    setInterval(() => {
      obs.next(new Date().toLocaleTimeString());
    }, 1000);
  });

  timerTwo: Observable<string> = interval(1000).pipe(map(x => {
    return new Date().toLocaleTimeString();
  }));

  constructor(private _studentService: studentService, private http: HttpClient) { }

  ngOnInit(): void {
    this._studentService.getStudentFromServer().subscribe(
      data => {
        this.students = data;
        this.initializeObservables();
      },
      error => {
        console.error('Error fetching students', error);
      }
    );

    this.timerOne.subscribe((val) => {
      this.y = val;
    });

    this.timerTwo.subscribe((val) => {
      this.y1 = val;
    });
  }

  initializeObservables(): void {
    this.source = new Observable((observer) => {
      this.students.forEach((x) => observer.next(x.firstName));
      observer.complete();
    });

    this.studentsNames = from(this.students).pipe(
      map((x) => x.firstName)
    );

    this.source.subscribe({
      next: (val) => {
        console.log('Student name:', val);
        this.x = val;
      },
      error: (err) => console.error('Error:', err),
      complete: () => console.log('Observable completed'),
    });

    this.studentsNames.subscribe({
      next: (val) => {
        console.log('Student name from map:', val);
        this.x1 = val;
      },
      error: (err) => console.error('Error:', err),
      complete: () => console.log('Observable completed from map'),
    });
  }

  sendMail() {
    const recipient = 's@a.com';
    const subject = 'Student Information';
    const mockUrl = 'https://jsonplaceholder.typicode.com/posts';

    this.emailObservable = new Observable((observer) => {
      for (let i = 0; i < this.students.length; i++) {
        const student = this.students[i];
        if (student.isActive) {
          observer.next(`Sending email to ${student.firstName} to ${recipient}`);
        }
      }

      this.http.post(mockUrl, { recipient, subject }).subscribe({
        next: (response) => {
          observer.next(response);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });

    this.emailObservable.subscribe({
      next: (message) => {
        if (typeof message === 'string') {
          this.z.push(message);
        } else if (message && typeof message === 'object' && message.message) {
          this.z.push(message);
        }
      },
      error: (error) => console.error('Error "sending" email', error),
      complete: () => {
        console.log('Email "sending" process completed');
        setTimeout(() => {
          this.z = [];
        }, 3000);
      }
    });
  }

  sendMailS() {
    const recipient = 's@a.com';
    const subject = 'Student Information';
    const mockUrl = 'https://jsonplaceholder.typicode.com/posts';

    this.emailObservable1 = from(this.students).pipe(
      filter(student => student.isActive),
      map(student => `Sending email to ${student.firstName} to ${recipient}`)
    );

    this.emailObservable1.subscribe({
      next: (message) => {
        if (typeof message === 'string') {
          this.z1.push(message);
        } else if (message && typeof message === 'object' && message.message) {
          this.z1.push(message);
        }
      },
      error: (error) => console.error('Error "sending" email', error),
      complete: () => {
        console.log('Email "sending" process completed');
        setTimeout(() => {
          this.z1 = [];
        }, 3000);
      }
    });
  }
}
