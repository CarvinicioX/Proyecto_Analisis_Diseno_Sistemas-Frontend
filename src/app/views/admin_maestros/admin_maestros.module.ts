import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {AdminMaestrosComponent} from "./admin_maestros.component";
import {AdminMaestrosService} from './admin_maestros.service';
import {LaddaModule} from 'angular2-ladda';
import {ModalModule} from 'ngx-bootstrap';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';
import {TextMaskModule} from 'angular2-text-mask';
import {DatatableModule} from './../makotos_datatable/makoto_datatable.module';

@NgModule({
  declarations: [
    AdminMaestrosComponent
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
    AdminMaestrosComponent,
  ],
  providers:[
    AdminMaestrosService
  ]
})

export class AdminMaestrosModule {
}
