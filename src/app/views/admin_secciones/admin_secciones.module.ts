import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {AdminSeccionesComponent} from "./admin_secciones.component";
import {AgregarSeccionesComponent} from "./agregar_secciones/agregar_secciones.component";
import {BuscarSeccionesComponent} from "./buscar_secciones/buscar_secciones.component";
import {EliminarSeccionesComponent} from "./eliminar_secciones/eliminar_secciones.component";
import {ModificarSeccionesComponent} from "./modificar_secciones/modificar_secciones.component";
import {AdminSeccionesService} from './admin_secciones.service';
import {LaddaModule} from 'angular2-ladda';
import {ModalModule} from 'ngx-bootstrap';
@NgModule({
  declarations: [
    AdminSeccionesComponent,
    BuscarSeccionesComponent,
    AgregarSeccionesComponent,
    EliminarSeccionesComponent,
    ModificarSeccionesComponent
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
    AdminSeccionesComponent,
    BuscarSeccionesComponent,
    AgregarSeccionesComponent,
    EliminarSeccionesComponent,
    ModificarSeccionesComponent

  ],
  providers:[
  	AdminSeccionesService
  ]

})

export class AdminSeccionesModule {
}
