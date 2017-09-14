import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {AdminPadresComponent} from "./admin_padres.component";
import {LaddaModule} from 'angular2-ladda';
@NgModule({
  declarations: [
    AdminPadresComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LaddaModule
  ],
  exports: [
    AdminPadresComponent
  ],
})

export class AdminPadresModule {
}
