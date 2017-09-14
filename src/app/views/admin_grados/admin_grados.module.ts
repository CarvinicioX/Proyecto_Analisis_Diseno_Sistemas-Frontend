import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {AdminGradosComponent} from "./admin_grados.component";
import {LaddaModule} from 'angular2-ladda';
@NgModule({
  declarations: [
    AdminGradosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LaddaModule
  ],
  exports: [
    AdminGradosComponent
  ],
})

export class AdminGradosModule {
}
