import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {CursosComponent} from "./cursos.component";
import {LaddaModule} from 'angular2-ladda';
import {CursosService} from './cursos.service';

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
  providers:[CursosService]
})

export class CursosModule {
}
