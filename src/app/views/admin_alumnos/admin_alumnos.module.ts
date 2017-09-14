import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {AdminAlumnosComponent} from "./admin_alumnos.component";
import {AgregarAlumnosComponent} from "./agregar_alumnos/agregar_alumnos.component";
import {BuscarAlumnosComponent} from "./buscar_alumnos/buscar_alumnos.component";
import {EliminarAlumnosComponent} from "./eliminar_alumnos/eliminar_alumnos.component";
import {ModificarAlumnosComponent} from "./modificar_alumnos/modificar_alumnos.component";
import {AdminAlumnosService} from './admin_alumnos.service';
import {LaddaModule} from 'angular2-ladda';
import {ModalModule} from 'ngx-bootstrap';
@NgModule({
  declarations: [
    AdminAlumnosComponent,
    BuscarAlumnosComponent,
    AgregarAlumnosComponent,
    EliminarAlumnosComponent,
    ModificarAlumnosComponent
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
    AdminAlumnosComponent,
    BuscarAlumnosComponent,
    AgregarAlumnosComponent,
    EliminarAlumnosComponent,
    ModificarAlumnosComponent
  ],
  providers:[
    AdminAlumnosService
  ]
})

export class AdminAlumnosModule {
}
