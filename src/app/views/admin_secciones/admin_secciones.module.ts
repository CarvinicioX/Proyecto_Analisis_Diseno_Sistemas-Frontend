import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {AdminSeccionesComponent} from "./admin_secciones.component";
import {LaddaModule} from 'angular2-ladda';
@NgModule({
  declarations: [
    AdminSeccionesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LaddaModule
  ],
  exports: [
    AdminSeccionesComponent
  ],
})

export class AdminSeccionesModule {
}
