import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AccountComponent } from "./account/account.component";
import { ProfileComponent } from "./profile/profile.component";
import { FavoriteComponent } from "./favorite/favorite.component";
import { SettingHomeComponent } from "./setting-home/setting-home.component";
import { PageNotFoundComponent } from "src/app/page-not-found/page-not-found.component";


const SETTING_ROUTES: Route[] = [
    {
        path: "", component: SettingHomeComponent, children: [
            { path: "account", component: AccountComponent },
            { path: "profile", component: ProfileComponent },
            { path: "favorite", component: FavoriteComponent },
        ]
    },
    { path: "**", component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forChild(SETTING_ROUTES)],
    exports: [RouterModule]
})
export class SettingRoutingModule { }
