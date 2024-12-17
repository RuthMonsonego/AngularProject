import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { ObservableComponent } from "./observable.component";

const OBS_ROUTES: Route[] = [
    {path: "", component: ObservableComponent},
    { path: "**", component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forChild(OBS_ROUTES)],
    exports: [RouterModule]
})
export class ObservableRoutingModule { }