import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {AdminMaestrosComponent} from "./admin_maestros.component";
import {AgregarMaestrosComponent} from "./agregar_maestros/agregar_maestros.component";
import {BuscarMaestrosComponent} from "./buscar_maestros/buscar_maestros.component";
import {EliminarMaestrosComponent} from "./eliminar_maestros/eliminar_maestros.component";
import {ModificarMaestrosComponent} from "./modificar_maestros/modificar_maestros.component";
import {AdminMaestrosService} from './admin_maestros.service';
import {LaddaModule} from 'angular2-ladda';
import {ModalModule} from 'ngx-bootstrap';
@NgModule({
  declarations: [
    AdminMaestrosComponent,
    BuscarMaestrosComponent,
    AgregarMaestrosComponent,
      EliminarMaestrosComponent,
    ModificarMaestrosComponent

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
    AdminMaestrosComponent,
    BuscarMaestrosComponent,
    AgregarMaestrosComponent,
      EliminarMaestrosComponent,
    ModificarMaestrosComponent    
  ],
    providers:[
    AdminMaestrosService
  ]
})


export class AdminMaestrosModule {
}
