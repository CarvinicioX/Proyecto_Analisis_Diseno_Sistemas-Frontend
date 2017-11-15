import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {SeccionesMaestroComponent} from "./secciones_maestro.component";
import {SeccionesMaestroService} from './secciones_maestro.service';
import {LaddaModule} from 'angular2-ladda';
import {ModalModule} from 'ngx-bootstrap';
@NgModule({
  declarations: [
    SeccionesMaestroComponent

  
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
    SeccionesMaestroComponent
   

  ],
  providers:[
  	SeccionesMaestroService
  ]

})

export class SeccionesMaestroModule {
}
