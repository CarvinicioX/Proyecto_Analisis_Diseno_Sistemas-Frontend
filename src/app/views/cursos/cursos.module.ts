import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {CursosComponent} from "./cursos.component";
import {LaddaModule} from 'angular2-ladda';
@NgModule({
  declarations: [
    CursosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LaddaModule
  ],
  exports: [
    CursosComponent
  ],
})

export class CursosModule {
}
