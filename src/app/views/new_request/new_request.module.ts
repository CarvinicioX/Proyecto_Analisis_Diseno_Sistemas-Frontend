import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {NewRequestComponent} from "./new_request.component";
import {LaddaModule} from 'angular2-ladda';
@NgModule({
  declarations: [
    NewRequestComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LaddaModule
  ],
  exports: [
    NewRequestComponent
  ],
})

export class NewRequestModule {
}
