import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {TareasSeccionComponent} from "./tareas_seccion.component";
import {TareasSeccionService} from './tareas_seccion.service';
import {LaddaModule} from 'angular2-ladda';
import {ModalModule} from 'ngx-bootstrap';
@NgModule({
  declarations: [
    TareasSeccionComponent

  
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LaddaModule,
    ModalModule
  ],
  exports: [
    TareasSeccionComponent
   

  ],
  providers:[
  	TareasSeccionService
  ]

})

export class TareasSeccionModule {
}
