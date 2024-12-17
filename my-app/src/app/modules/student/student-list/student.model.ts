import { absence } from "../../../absence.model";

export class Student {
  id: number;
  lastName: string;
  firstName: string;
  address: string;
  phone: string;
  isActive: boolean;
  avg: number;
  schoolYear: string;
  academicStatus: AcademicStatus;
  absenteeismRecords: absence[];
  constructor(
    lastName: string = '',
    firstName: string = '',
    address: string = '',
    phone: string = '',
    isActive: boolean = false,
    avg: number = 0,
    schoolYear: string = "A",
    academicStatus: AcademicStatus = 1
  ) {
    this.id = 0;
    this.lastName = lastName;
    this.firstName = firstName;
    this.address = address;
    this.phone = phone;
    this.isActive = isActive;
    this.avg = avg;
    this.schoolYear = schoolYear;
    this.academicStatus = academicStatus;
    this.absenteeismRecords = []

  }
}
export enum AcademicStatus {
  FullTime = 1,
  PartTime = 2,
  OnLeave = 3
}
