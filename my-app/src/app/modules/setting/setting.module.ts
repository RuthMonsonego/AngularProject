import { NgModule } from "@angular/core";
import { AccountComponent } from "./account/account.component";
import { ProfileComponent } from "./profile/profile.component";
import { FavoriteComponent } from "./favorite/favorite.component";
import { RouterModule } from "@angular/router";
import { SettingHomeComponent } from "./setting-home/setting-home.component";
import { SettingRoutingModule } from "./setting-routing-module";
import { DirectionToggleDirective } from "src/app/direction-toggle.directive";
import { DirectionService } from "src/app/direction.service";

@NgModule({
    declarations: [AccountComponent, ProfileComponent, FavoriteComponent, SettingHomeComponent],
    imports: [SettingRoutingModule, RouterModule],
    providers: [],
    exports: []
})
export class SettingModule {

}