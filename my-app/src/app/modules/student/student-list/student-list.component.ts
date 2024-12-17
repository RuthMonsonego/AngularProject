import { Component, OnInit } from '@angular/core';
import { Student, AcademicStatus } from './student.model';
import { studentService } from '../student.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DetailsComponent } from "../details/details.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})

export class StudentListComponent implements OnInit {
  academicStatus = AcademicStatus;
  students: Student[] = [];
  days: number = 0;
  status: boolean = false;
  status1: boolean = false;
  statusdetails: boolean = false;
  showActiveOnly: boolean = false;

  private searchTerms = new Subject<string>();

  toSendStd: Student;

  constructor(private _studentServive: studentService, private router: Router) {
    this.toSendStd = new Student();
  }



  ngOnInit(): void {
    this._studentServive.getStudentFromServer().subscribe(
      data => {
        this.students = data;
      },
      error => {
        console.error('Error fetching students', error);
      }
    );

    this.setupSearch();
  }

  setupSearch() {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        if (term.trim() === '') {
          return this._studentServive.getStudentFromServer();
        } else {
          return this._studentServive.getSearchStudemtFromServer(term);
        }
      })
    ).subscribe(data => {
      this.students = data;
    });
  }

  filterBySearch(term: string): void {
    this.searchTerms.next(term);
  }
  calk(id: number) {

    return this.getDaysById(id)

  }
  getDaysById(id: number): number {

    let std: Student | undefined = this.students.find(x => x.id === id);

    if (std && std.absenteeismRecords) {
      return std.absenteeismRecords.reduce((sum, record) => sum + (record.absenteeismDays ?? 0), 0);
    } else {
      return 0;
    }
  }
  delitestudent(id: number) {
    this._studentServive.deleteStudentServer(id).subscribe(data => {
      if (data) {
        alert("delete success!");
        this._studentServive.getStudentFromServer().subscribe(
          data => {
            this.students = data;
          },
          error => {
            console.error('Error fetching students', error);
          }
        );
      }
    },
      err => {
        alert("delete failed!");
      });
  }

  showPanel(s: Student) {
    this.statusdetails = !this.statusdetails;
    this.toSendStd = { ...s };
  }

  edding(std: Student) {
    this.router.navigate(['/add', std.id]);
    this.change1();
  }

  change() {
    this.status = !this.status;
  }

  change1() {
    this.status1 = !this.status1;
  }

  // addstd() {
  //   this.from = '';
  //   this.toSendStd = new Student();
  //   this.toSendStd.id = this.students[this.students.length - 1].id + 1;
  //   this.change();
  // }

  // addnewstdtolist(toadd: Student) {
  //   console.log("to")
  //   console.log(toadd)
  //   let index = this.students.findIndex(x => x.id == toadd.id);
  //   if (index === -1) {
  //     this._studentServive.addStdToServer(toadd).subscribe(data => {
  //       if (data) {
  //         alert("add success!");
  //         this._studentServive.getStudentFromServer().subscribe(
  //           data => {
  //             this.students = data;
  //             this.status = false;
  //           },
  //           error => {
  //             console.error('Error fetching students', error);
  //           }
  //         );
  //       }
  //     },
  //     error => {
  //       alert("add failed!");
  //     });
  //   } else {
  //     this._studentServive.apdateToServer(toadd.id, toadd).subscribe(data => {
  //       if (data) {
  //         alert("update success!");
  //         this._studentServive.getStudentFromServer().subscribe(
  //           data => {
  //             this.students = data;
  //             this.status1 = false;
  //           },
  //           error => {
  //             console.error('Error fetching students', error);
  //           }
  //         );
  //       }
  //     },
  //     error => {
  //       alert("update failed!");
  //     });
  //   }
  // }
}
