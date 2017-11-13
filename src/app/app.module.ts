//Native Imports
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from "@angular/router";
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ROUTES} from "./app.routes";

//Components and Modules Imports
import {AppComponent} from './app.component';
import {LoginModule} from "./views/login/login.module";
import {RegisterModule} from "./views/register/register.module";
import {AdministracionModule} from "./views/administracion/administracion.module";
import {CursosModule} from "./views/cursos/cursos.module";
import {HomeModule} from "./views/home/home.module";
import {LayoutsModule} from "./components/common/layouts/layouts.module";
import {AdminSeccionesModule} from "./views/admin_secciones/admin_secciones.module";
import {AdminAlumnosModule} from "./views/admin_alumnos/admin_alumnos.module";
import {AdminClasesModule} from "./views/admin_clases/admin_clases.module";
import {AdminGradosModule} from "./views/admin_grados/admin_grados.module";
import {AdminMaestrosModule} from "./views/admin_maestros/admin_maestros.module";
import {AdminPadresModule} from "./views/admin_padres/admin_padres.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    LayoutsModule,
    LoginModule,
    RegisterModule,
    AdministracionModule,
    CursosModule,
    HomeModule,
    AdminSeccionesModule,
    AdminAlumnosModule,
    AdminClasesModule,
    AdminGradosModule,
    AdminMaestrosModule,
    AdminPadresModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
