import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {AdminMaestrosComponent} from "./admin_maestros.component";
import {LaddaModule} from 'angular2-ladda';
@NgModule({
  declarations: [
    AdminMaestrosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LaddaModule
  ],
  exports: [
    AdminMaestrosComponent
  ],
})

export class AdminMaestrosModule {
}
