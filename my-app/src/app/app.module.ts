import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from "./app.component";
import { StudentListComponent } from './modules/student/student-list/student-list.component';
import { OneStudentComponent } from './modules/student/one-student/one-student.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { studentService } from "./modules/student/student.service";
import { ObservableComponent } from './observable/observable.component';
import { StudentModule } from "./modules/student/student.module";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DirectionToggleDirective } from './direction-toggle.directive';
import { DirectionService } from "./direction.service";
import { ObservableModule } from "./observable/obserable.module";

@NgModule({
     declarations: [AppComponent, PageNotFoundComponent, HomeComponent, LoginComponent, DirectionToggleDirective],
     imports: [BrowserModule, StudentModule, RouterModule, AppRoutingModule,ObservableModule],
     providers: [DirectionService],
     bootstrap: [AppComponent]
})

export class AppModule {

}