import { Injectable, numberAttribute } from "@angular/core";
import { Student, AcademicStatus } from "./student-list/student.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
const academicStatus = AcademicStatus;

let students: Student[] = []
//   id: 1,
//   lastName: "cohen",
//   firstName: "yael",
//   address: "bb",
//   phone: "0583248523",
//   isActive: true,
//   avg: 200,
//   schoolYear: "B",
//   academicStatus: academicStatus.OnLeave,
//   absenteeismRecords:[
//      {absenteeismDays:5},
//      {absenteeismDays:4},
//      {absenteeismDays:6},
//   ]
// },
// {
//   id: 2,
//   lastName: "levi",
//   firstName: "avi",
//   address: "bb",
//   phone: "0583248523",
//   isActive: true,
//   avg: 100,
//   schoolYear: "B",
//   academicStatus: academicStatus.OnLeave,
//   absenteeismRecords:[
//       {absenteeismDays:5},
//       {absenteeismDays:4},
//       {absenteeismDays:6},
//   ]
// }]
@Injectable()
export class studentService {
  constructor(private _http: HttpClient) {

  }
  getStudentFromServer(): Observable<Student[]> {
    return this._http.get<Student[]>("/api/Students")
  }
  addStdToServer(s: Student): Observable<boolean> {
    return this._http.post<boolean>("/api/Students", s);
  }
  deleteStudentServer(id: Number): Observable<boolean> {
    return this._http.delete<boolean>(`/api/Students/${id}`)
  }
  apdateToServer(id: number, s: Student): Observable<boolean> {
    return this._http.put<boolean>(`/api/Students/${id}`, s)
  }
  getSearchStudemtFromServer(name: string): Observable<Student[]> {
    return this._http.get<Student[]>(`/api/Students/filterByName/${name}`);
  }
  // getStudentSlowly(): Promise<Student[]> {
  //     return new Promise((res, rej) => {
  //         setTimeout(() => {
  //             res(students);
  //         }, 1000);
  //     })
  // }
  // getAvgById(id:number):number
  // { 
  //  let index:number =students.findIndex(x => x.id==id)
  //   return students[index].avg;
  // }
  // getStudent():Student []
  // {return students}


}
