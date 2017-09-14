import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {AdminClasesComponent} from "./admin_clases.component";
import {LaddaModule} from 'angular2-ladda';
@NgModule({
  declarations: [
    AdminClasesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LaddaModule
  ],
  exports: [
    AdminClasesComponent
  ],
})

export class AdminClasesModule {
}
