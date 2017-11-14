import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {MaestroTareasComponent} from "./maestro_tareas.component";
import {AgregarTareasComponent} from "./agregar_tareas/agregar_tareas.component";

import {EliminarTareasComponent} from "./eliminar_tareas/eliminar_tareas.component";
import {ModificarTareasComponent} from "./modificar_tareas/modificar_tareas.component";
import {MaestroTareasService} from './maestro_tareas.service';
import {LaddaModule} from 'angular2-ladda';
import {ModalModule} from 'ngx-bootstrap';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';
import {TextMaskModule} from 'angular2-text-mask';

@NgModule({
  declarations: [
    MaestroTareasComponent,
    AgregarTareasComponent,
    EliminarTareasComponent,
    ModificarTareasComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LaddaModule,
    ModalModule,
    NgxMyDatePickerModule,
    TextMaskModule
  ],
  exports: [
    MaestroTareasComponent,
    AgregarTareasComponent,
    EliminarTareasComponent,
    ModificarTareasComponent
  ],
  providers:[
    MaestroTareasService
  ]
})

export class MaestroTareasModule {
}
