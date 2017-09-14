import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {AdministracionComponent} from "./administracion.component";
import {LaddaModule} from 'angular2-ladda';
@NgModule({
  declarations: [
    AdministracionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LaddaModule
  ],
  exports: [
    AdministracionComponent
  ],
})

export class AdministracionModule {
}
