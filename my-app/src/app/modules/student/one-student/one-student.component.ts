import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student, AcademicStatus } from '../student-list/student.model';
import { studentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddupdateService } from '../addUpdate.service';

@Component({
  selector: 'app-one-student',
  templateUrl: './one-student.component.html',
  styleUrls: ['./one-student.component.scss']
})
export class OneStudentComponent implements OnInit, OnChanges {
  student!: Student;
  students: Student[] = [];
  maxId1: number = -1;
  @Input() from1!: string;
  //@Output() newstd: EventEmitter<Student> = new EventEmitter();
  firstFocusEmitted: boolean = false;

  academicStatus = AcademicStatus;
  newOneStd: any = {
    absenteeismRecords: []
  };
  stdForm: FormGroup;
  missingFromDate: Date = new Date();
  missingFromDays: number = 0;
  sum: number = 0;

  constructor(private _studentServive: studentService, private _acr: ActivatedRoute, private router: Router, private _addservice: AddupdateService) {
    this.stdForm = new FormGroup({
      "id": new FormControl(-1),
      "lastName": new FormControl('', [Validators.required, Validators.minLength(3)]),
      "firstName": new FormControl('', [Validators.required, Validators.minLength(3)]),
      "address": new FormControl('', Validators.required),
      "phone": new FormControl('', [Validators.required, Validators.pattern('^0[2-9]{1}[0-9]{7,8}$'), Validators.minLength(9)]),
      "isActive": new FormControl(false),
      "avg": new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      "schoolYear": new FormControl(''),
      "academicStatus": new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this._studentServive.getStudentFromServer().subscribe(
      data => {
        this.students = data;
      },
      error => {
        console.error('Error fetching students', error);
      });

    const value = this._acr.snapshot.paramMap.get('id');
    if (value !== null) {
      const studentId = +value;
      this._studentServive.getStudentFromServer().subscribe(data => {
        const student = data.find(x => x.id === studentId);
        if (student) {
          this.student = student;
          this.updateForm();
          this.updateSum();
        }
      });
    } else {
      this.student = new Student();
      this._studentServive.getStudentFromServer().subscribe(data => {
        const maxId = Math.max(...data.map(student => student.id));
        this.maxId1 = maxId;
        this.student.id = maxId + 1;
        this.updateForm()
      });
    }
    if (this.student && this.student.absenteeismRecords) {
      this.updateSum();
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student'] && changes['student'].currentValue) {
      this.updateForm();
      this.updateSum();

    }
  }

  updateForm(): void {
    if (this.student) {
      this.stdForm.patchValue({

        id: this.student.id,
        lastName: this.student.lastName,
        firstName: this.student.firstName,
        address: this.student.address,
        phone: this.student.phone,
        isActive: this.student.isActive,
        avg: this.student.avg,
        schoolYear: this.student.schoolYear,
        academicStatus: this.student.academicStatus
      });
    }

  }

  updateSum(): void {
    this.sum = this.getDaysById(this.student.id);
  }

  savestd(): void {
    if (this.stdForm.valid) {
      let newAbsenteeismRecord = {};
      if (this.missingFromDate && this.missingFromDays > 0) {
        newAbsenteeismRecord = {
          absenceStartDate: this.missingFromDate,
          absenteeismDays: this.missingFromDays
        };
      }

      const updatedStd = { ...this.newOneStd, absenteeismRecords: this.student.absenteeismRecords };
      if (Object.keys(newAbsenteeismRecord).length > 0) {
        if (updatedStd.absenteeismRecords.length == 0)
          updatedStd.absenteeismRecords = [newAbsenteeismRecord];
        else
          updatedStd.absenteeismRecords.push(newAbsenteeismRecord);
      }

      const formData = { ...this.stdForm.value, absenteeismRecords: updatedStd.absenteeismRecords };
      // this.newstd.emit(formData);
      this._addservice.addtoservice(formData);
      this.router.navigate(['/list']);

      this.stdForm.reset(new Student());
      this.missingFromDate = new Date();
      this.missingFromDays = 0;
      this.firstFocusEmitted = false;
      this.updateSum();
    }
  }
  getDaysById(id: number): number {
    if (this.student && this.student.absenteeismRecords) {
      return this.student.absenteeismRecords.reduce((sum, record) => sum + (record.absenteeismDays ?? 0), 0);
    } else {
      return 0;
    }
  }

  inputFocus(): void {
    if (!this.firstFocusEmitted) {
      this.firstFocusEmitted = true;
    }
  }
}
