import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {AdminSeccionesComponent} from "./admin_secciones.component";
import {AdminSeccionesService} from './admin_secciones.service';
import {LaddaModule} from 'angular2-ladda';
import {ModalModule} from 'ngx-bootstrap';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';
import {TextMaskModule} from 'angular2-text-mask';
import {DatatableModule} from './../makotos_datatable/makoto_datatable.module';

@NgModule({
  declarations: [
    AdminSeccionesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LaddaModule,
    ModalModule,
    NgxMyDatePickerModule.forRoot(),
    TextMaskModule,
    DatatableModule
  ],
  exports: [
    AdminSeccionesComponent,
  ],
  providers:[
    AdminSeccionesService
  ]
})

export class AdminSeccionesModule {
}
