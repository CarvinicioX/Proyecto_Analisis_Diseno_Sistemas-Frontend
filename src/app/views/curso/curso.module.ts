import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {CursoComponent} from "./curso.component";
import {LaddaModule} from 'angular2-ladda';
import {ModalModule} from 'ngx-bootstrap';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';
import {TextMaskModule} from 'angular2-text-mask';
import {CursoService} from './curso.service';

@NgModule({
  declarations: [
    CursoComponent
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
    CursoComponent
  ],
  providers:[CursoService]
})

export class CursoModule {
}
