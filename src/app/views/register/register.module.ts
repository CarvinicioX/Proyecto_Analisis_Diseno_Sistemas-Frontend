//Native imports
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";

//Third party libraries imports
import {LaddaModule} from 'angular2-ladda';
import {ModalModule} from 'ngx-bootstrap';

//Component Import
import {RegisterComponent} from "./register.component";

//Providers imports
import {RegisterService} from "./register.service";

@NgModule({
  //declarations
  declarations: [
    RegisterComponent
  ],
  //imports
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LaddaModule,
    ModalModule
  ],
  //exports
  exports: [
    RegisterComponent
  ],
  //providers
  providers:[
    RegisterService
  ]
})

export class RegisterModule {
}
