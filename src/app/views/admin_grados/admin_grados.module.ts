import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {AdminGradosComponent} from "./admin_grados.component";
import {AgregarGradosComponent} from "./agregar_grados/agregar_grados.component";
import {BuscarGradosComponent} from "./buscar_grados/buscar_grados.component";
import {EliminarGradosComponent} from "./eliminar_grados/eliminar_grados.component";
import {ModificarGradosComponent} from "./modificar_grados/modificar_grados.component";
import {AdminGradosService} from './admin_grados.service';
import {LaddaModule} from 'angular2-ladda';
import {ModalModule} from 'ngx-bootstrap';
@NgModule({
  declarations: [
    AdminGradosComponent,
    BuscarGradosComponent,
    AgregarGradosComponent,
    EliminarGradosComponent,
    ModificarGradosComponent
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
    AdminGradosComponent,
    BuscarGradosComponent,
    AgregarGradosComponent,
    EliminarGradosComponent,
    ModificarGradosComponent
  ],
  providers:[
    AdminGradosService
  ],
})

export class AdminGradosModule {
}
