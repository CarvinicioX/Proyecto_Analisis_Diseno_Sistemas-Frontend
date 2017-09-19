import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {AdminPadresComponent} from "./admin_padres.component";
import {AgregarPadresComponent} from "./agregar_padres/agregar_padres.component";
import {BuscarPadresComponent} from "./buscar_padres/buscar_padres.component";
import {EliminarPadresComponent} from "./eliminar_padres/eliminar_padres.component";
import {ModificarPadresComponent} from "./modificar_padres/modificar_padres.component";
import {AdminPadresService} from "./admin_padres.service";
import {LaddaModule} from 'angular2-ladda';
import {ModalModule} from 'ngx-bootstrap';


@NgModule({
  declarations: [
    AdminPadresComponent,
    BuscarPadresComponent,
    AgregarPadresComponent,
    EliminarPadresComponent,
    ModificarPadresComponent
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
    AdminPadresComponent,
    BuscarPadresComponent,
    AgregarPadresComponent,
    EliminarPadresComponent,
    ModificarPadresComponent
    ],
  providers:[
    AdminPadresService
  ]
})

export class AdminPadresModule {
}
