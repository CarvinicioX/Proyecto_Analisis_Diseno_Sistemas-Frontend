//Native Imports
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';

//Components Imports
import {DatatableComponent} from "./makoto_datatable.component";


@NgModule({
  //Declarations
  declarations: [
    DatatableComponent
  ],
  //Imports
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  //Exports
  exports: [
    DatatableComponent
  ],
})

export class DatatableModule {}
