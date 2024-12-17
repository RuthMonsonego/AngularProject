import { NgModule } from "@angular/core";
import { StudentListComponent } from "./student-list/student-list.component";
import { OneStudentComponent } from "./one-student/one-student.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { studentService } from "./student.service";
import { CommonModule } from "@angular/common";
import { DetailsComponent } from "./details/details.component";
import { AddupdateService } from "./addUpdate.service";


@NgModule({
    declarations: [StudentListComponent, OneStudentComponent, DetailsComponent],
    imports: [BrowserModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
    providers: [studentService, AddupdateService],
    exports: [StudentListComponent]
})
export class StudentModule {

}