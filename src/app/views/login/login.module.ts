//Native imports
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

//Third party libraries imports
import {LaddaModule} from 'angular2-ladda';

//Component Import
import {LoginComponent} from "./login.component";

//Providers imports
import {LoginService} from "./login.service";


@NgModule({
  //declarations
  declarations: [
    LoginComponent
  ],
  //imports
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LaddaModule
  ],
  //exports
  exports: [
    LoginComponent
  ],
  //providers
  providers:[
    LoginService
  ]
})

export class LoginModule {
}
