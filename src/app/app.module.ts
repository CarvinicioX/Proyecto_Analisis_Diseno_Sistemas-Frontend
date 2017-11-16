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
import {TareasModule} from "./views/tareas/tareas.module";
import {HomeModule} from "./views/home/home.module";
import {LayoutsModule} from "./components/common/layouts/layouts.module";
import {AdminSeccionesModule} from "./views/admin_secciones/admin_secciones.module";
import {AdminAlumnosModule} from "./views/admin_alumnos/admin_alumnos.module";
import {AdminClasesModule} from "./views/admin_clases/admin_clases.module";
import {AdminGradosModule} from "./views/admin_grados/admin_grados.module";
import {AdminMaestrosModule} from "./views/admin_maestros/admin_maestros.module";
import {AdminPadresModule} from "./views/admin_padres/admin_padres.module";
import {SeccionesMaestroModule} from "./views/secciones_maestro/secciones_maestro.module";
import {MaestroTareasModule} from "./views/maestro_tareas/maestro_tareas.module";
import {TareasSeccionModule} from "./views/tareas_seccion/tareas_seccion.module";
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
    TareasSeccionModule,
    LoginModule,
    RegisterModule,
    AdministracionModule,
    CursosModule,
    TareasModule,
    HomeModule,
    AdminSeccionesModule,
    AdminAlumnosModule,
    AdminClasesModule,
    AdminGradosModule,
    AdminMaestrosModule,
    AdminPadresModule,
    SeccionesMaestroModule,
    MaestroTareasModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
