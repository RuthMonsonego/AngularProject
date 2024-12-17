import { Component, NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { StudentListComponent } from "./modules/student/student-list/student-list.component";
import { OneStudentComponent } from "./modules/student/one-student/one-student.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./AuthGuard";
import { ObservableComponent } from "./observable/observable.component";
const APP_ROUTES: Route[] = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "list", component: StudentListComponent },
    { path: "add", component: OneStudentComponent },
    { path: "add/:id", component: OneStudentComponent },
    { path: "login", component: LoginComponent },
    { path: "setting", loadChildren: () => import('./modules/setting/setting.module').then(m => m.SettingModule), canActivate: [AuthGuard] },
    // {path: "obser", loadChildren: () => import('./observable/obserable.module').then(m => m.ObservableModule)},
    {path:"obser",component:ObservableComponent},
    { path: "**", component: PageNotFoundComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}