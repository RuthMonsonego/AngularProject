import { NgModule } from "@angular/core";
import { ObservableComponent } from "./observable.component";
import { ObservableRoutingModule } from "./obserable-routing-module";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [ObservableComponent],
    imports: [ObservableRoutingModule, RouterModule],
    providers: [],
    exports: []
})
export class ObservableModule {

}