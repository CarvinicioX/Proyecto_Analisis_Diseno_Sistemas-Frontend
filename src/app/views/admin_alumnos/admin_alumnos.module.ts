import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {AdminAlumnosComponent} from "./admin_alumnos.component";
import {LaddaModule} from 'angular2-ladda';
@NgModule({
  declarations: [
    AdminAlumnosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LaddaModule
  ],
  exports: [
    AdminAlumnosComponent
  ],
})

export class AdminAlumnosModule {
}
