import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {AdminAlumnosComponent} from "./admin_alumnos.component";
import {AdminAlumnosService} from './admin_alumnos.service';
import {LaddaModule} from 'angular2-ladda';
import {ModalModule} from 'ngx-bootstrap';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';
import {TextMaskModule} from 'angular2-text-mask';
import {DatatableComponent} from './../makotos_datatable/makoto_datatable.component';

@NgModule({
  declarations: [
    AdminAlumnosComponent,
    DatatableComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LaddaModule,
    ModalModule,
    NgxMyDatePickerModule.forRoot(),
    TextMaskModule
  ],
  exports: [
    AdminAlumnosComponent,
  ],
  providers:[
    AdminAlumnosService
  ]
})

export class AdminAlumnosModule {
}
