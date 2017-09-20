import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {AgregarClasesComponent} from "./agregar_clases/agregar_clases.component";
import {BuscarClasesComponent} from "./buscar_clases/buscar_clases.component";
import {AdminClasesComponent} from "./admin_clases.component";
import {EliminarClasesComponent} from "./eliminar_clases/eliminar_clases.component";
import {ModificarClasesComponent} from "./modificar_clases/modificar_clases.component";
import {AdminClasesService} from './admin_clases.service';
import {LaddaModule} from 'angular2-ladda';
@NgModule({
  declarations: [
    AdminClasesComponent,
     BuscarClasesComponent,
    AgregarClasesComponent,
      EliminarClasesComponent,
    ModificarClasesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LaddaModule
  ],
  exports: [
    AdminClasesComponent,
     BuscarClasesComponent,
    AgregarClasesComponent,
     EliminarClasesComponent,
    ModificarClasesComponent
  ],
  providers:[
    AdminClasesService
  ]
})

export class AdminClasesModule {
}
