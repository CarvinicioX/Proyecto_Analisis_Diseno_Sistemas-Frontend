import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {TareasComponent} from "./tareas.component";
import {LaddaModule} from 'angular2-ladda';
@NgModule({
  declarations: [
    TareasComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LaddaModule
  ],
  exports: [
    TareasComponent
  ],
})

export class TareasModule {
}
