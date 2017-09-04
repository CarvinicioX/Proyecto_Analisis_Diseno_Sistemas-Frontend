//Native Imports
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";

//Third Party Imports
import {LaddaModule} from 'angular2-ladda';

//Component Imports
import {HomeComponent} from "./home.component";

//Provider Imports
import {HomeService} from "./home.service";



@NgModule({
  //declarations
  declarations: [
    HomeComponent
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
    HomeComponent
  ],
  //providers
  providers:[HomeService]
})

export class HomeModule {
}
