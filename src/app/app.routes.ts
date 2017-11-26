//Native Imports
import {Routes} from "@angular/router";

//Component Imports
import {LoginComponent} from "./views/login/login.component";
import {RegisterComponent} from "./views/register/register.component";
import {AdministracionComponent} from "./views/administracion/administracion.component";
import {HomeComponent} from "./views/home/home.component";
import {BasicLayoutComponent} from "./components/common/layouts/basicLayout.component";

//Alumnos
import {AdminAlumnosComponent} from "./views/admin_alumnos/admin_alumnos.component";

//Secciones
import {AdminSeccionesComponent} from "./views/admin_secciones/admin_secciones.component";
import {AgregarSeccionesComponent} from "./views/admin_secciones/agregar_secciones/agregar_secciones.component";
import {BuscarSeccionesComponent} from "./views/admin_secciones/buscar_secciones/buscar_secciones.component";
import {EliminarSeccionesComponent} from "./views/admin_secciones/eliminar_secciones/eliminar_secciones.component";
import {ModificarSeccionesComponent} from "./views/admin_secciones/modificar_secciones/modificar_secciones.component";

//Clases
import {AdminClasesComponent} from "./views/admin_clases/admin_clases.component";
import {AgregarClasesComponent} from "./views/admin_clases/agregar_clases/agregar_clases.component";
import {BuscarClasesComponent} from "./views/admin_clases/buscar_clases/buscar_clases.component";
import {EliminarClasesComponent} from "./views/admin_clases/eliminar_clases/eliminar_clases.component";
import {ModificarClasesComponent} from  "./views/admin_clases/modificar_clases/modificar_clases.component";

//Grados
import {AdminGradosComponent} from "./views/admin_grados/admin_grados.component";
import {AgregarGradosComponent} from "./views/admin_grados/agregar_grados/agregar_grados.component";
import {BuscarGradosComponent} from "./views/admin_grados/buscar_grados/buscar_grados.component";
import {EliminarGradosComponent} from "./views/admin_grados/eliminar_grados/eliminar_grados.component";
import {ModificarGradosComponent} from "./views/admin_grados/modificar_grados/modificar_grados.component";

//Maestros
import {AdminMaestrosComponent} from "./views/admin_maestros/admin_maestros.component";
import {EliminarMaestrosComponent} from "./views/admin_maestros/eliminar_maestros/eliminar_maestros.component";
import {ModificarMaestrosComponent} from "./views/admin_maestros/modificar_maestros/modificar_maestros.component";
import {AgregarMaestrosComponent} from "./views/admin_maestros/agregar_maestros/agregar_maestros.component";
import {BuscarMaestrosComponent} from "./views/admin_maestros/buscar_maestros/buscar_maestros.component";

//Padres
import {AdminPadresComponent} from "./views/admin_padres/admin_padres.component";
import {AgregarPadresComponent} from "./views/admin_padres/agregar_padres/agregar_padres.component";
import {BuscarPadresComponent} from "./views/admin_padres/buscar_padres/buscar_padres.component";
import {EliminarPadresComponent} from "./views/admin_padres/eliminar_padres/eliminar_padres.component";
import {ModificarPadresComponent} from "./views/admin_padres/modificar_padres/modificar_padres.component";



export const ROUTES:Routes = [
  	{path: 'login', component: LoginComponent},
  	{path: 'register', component: RegisterComponent},
  	{path: 'plataforma', component: BasicLayoutComponent, 
    children: [
      	{path: 'administracion', component: AdministracionComponent},
      	{path: 'inicio', component: HomeComponent},
      	{path: 'admin_secciones', component: AdminSeccionesComponent},
        {path: 'admin_secciones/agregar_secciones', component: AgregarSeccionesComponent},
        {path: 'admin_secciones/buscar_secciones', component: BuscarSeccionesComponent},
        {path: 'admin_secciones/eliminar_secciones', component: EliminarSeccionesComponent},
        {path: 'admin_secciones/modificar_secciones', component: ModificarSeccionesComponent},
        {path: 'admin_alumnos', component: AdminAlumnosComponent},
        {path: 'admin_grados', component: AdminGradosComponent},        
        {path: 'admin_grados/agregar_grados', component: AgregarGradosComponent},
        {path: 'admin_grados/buscar_grados', component: BuscarGradosComponent},
        {path: 'admin_grados/eliminar_grados', component: EliminarGradosComponent},
        {path: 'admin_grados/modificar_grados', component: ModificarGradosComponent},
        {path: 'admin_clases', component: AdminClasesComponent},
        {path: 'admin_clases/agregar_clases', component: AgregarClasesComponent},
        {path: 'admin_clases/buscar_clases', component: BuscarClasesComponent},
        {path: 'admin_clases/eliminar_clases', component: EliminarClasesComponent},
        {path: 'admin_clases/modificar_clases', component: ModificarClasesComponent},
        {path: 'admin_maestros', component: AdminMaestrosComponent},
        {path: 'admin_maestros/eliminar_maestros', component: EliminarMaestrosComponent},
        {path: 'admin_maestros/modificar_maestros', component: ModificarMaestrosComponent},
        {path: 'admin_maestros/agregar_maestros', component: AgregarMaestrosComponent},
        {path: 'admin_maestros/buscar_maestros', component: BuscarMaestrosComponent},
	      {path: 'admin_padres', component: AdminPadresComponent},
        {path: 'admin_padres/agregar_padres', component: AgregarPadresComponent},
        {path: 'admin_padres/buscar_padres', component: BuscarPadresComponent},
        {path: 'admin_padres/eliminar_padres', component: EliminarPadresComponent},
	      {path: 'admin_padres/modificar_padres', component: ModificarPadresComponent},

    ]
  },
  {path: '**',  redirectTo: 'login'}
];
