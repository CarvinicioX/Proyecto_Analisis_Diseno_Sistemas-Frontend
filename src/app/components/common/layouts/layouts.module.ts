//Native Imports
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

//Third party libraries imports
import {BsDropdownModule} from 'ngx-bootstrap';

//Components Imports
import {BasicLayoutComponent} from "./basicLayout.component";
import {NavigationComponent} from "./../navigation/navigation.component";
import {FooterComponent} from "./../footer/footer.component";
import {TopNavbarComponent} from "./../topnavbar/topnavbar.component";


@NgModule({
  //Declarations
  declarations: [
    FooterComponent,
    BasicLayoutComponent,
    NavigationComponent,
    TopNavbarComponent,
  ],
  //Imports
  imports: [
    BrowserModule,
    RouterModule,
    BsDropdownModule.forRoot()
  ],
  //Exports
  exports: [
    FooterComponent,
    BasicLayoutComponent,
    NavigationComponent,
    TopNavbarComponent,
  ],
})

export class LayoutsModule {}
