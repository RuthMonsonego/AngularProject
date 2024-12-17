import { Injectable, OnInit } from "@angular/core";
import { Student } from "./student-list/student.model";
import { studentService } from "./student.service";

@Injectable()
export class AddupdateService implements OnInit {
    students: Student[] = [];
    formData !: Student;

    constructor(private __studentServive: studentService) {
        this.__studentServive.getStudentFromServer().subscribe(
            data => {
                this.students = data;
            },
            error => {
                console.error('Error fetching students', error);
            });
    }

    ngOnInit(): void {
    }


    addtoservice(formData1: Student) {
        if (!formData1) {
            console.error('Invalid formData1');
            return;
        }

        this.formData = formData1;
        if (!this.students || this.students.length === 0) {
            console.error('Students array is empty or not initialized');
            return;
        }

        let index = this.students.findIndex(x => x.id == this.formData.id);
        if (index === -1) {
            this.formData.id = this.students[this.students.length - 1].id + 1;
            this.__studentServive.addStdToServer(this.formData).subscribe(
                data => {
                    alert("add success!");
                },
                error => {
                    alert("add failed!");
                });
        } else {
            this.__studentServive.apdateToServer(this.formData.id, this.formData).subscribe(
                data => {
                    if (data) {
                        alert("update success!");
                    }
                },
                error => {
                    alert("update failed!");
                });
        }
    }
}
