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
import {AgregarAlumnosComponent} from "./views/admin_alumnos/agregar_alumnos/agregar_alumnos.component";
import {BuscarAlumnosComponent} from "./views/admin_alumnos/buscar_alumnos/buscar_alumnos.component";
import {EliminarAlumnosComponent} from "./views/admin_alumnos/eliminar_alumnos/eliminar_alumnos.component";
import {ModificarAlumnosComponent} from "./views/admin_alumnos/modificar_alumnos/modificar_alumnos.component";

//Secciones
import {AdminSeccionesComponent} from "./views/admin_secciones/admin_secciones.component";
//Clases
import {AdminClasesComponent} from "./views/admin_clases/admin_clases.component";
//Grados
import {AdminGradosComponent} from "./views/admin_grados/admin_grados.component";
//Maestros
import {AdminMaestrosComponent} from "./views/admin_maestros/admin_maestros.component";
//Padres
import {AdminPadresComponent} from "./views/admin_padres/admin_padres.component";


export const ROUTES:Routes = [
  	{path: 'login', component: LoginComponent},
  	{path: 'register', component: RegisterComponent},
  	{path: 'plataforma', component: BasicLayoutComponent, 
    children: [
      	{path: 'administracion', component: AdministracionComponent},
      	{path: 'inicio', component: HomeComponent},
      	{path: 'admin_secciones', component: AdminSeccionesComponent},
        {path: 'admin_alumnos', component: AdminAlumnosComponent},
        {path: 'admin_alumnos/agregar_alumnos', component: AgregarAlumnosComponent},
        {path: 'admin_alumnos/buscar_alumnos', component: BuscarAlumnosComponent},
        {path: 'admin_alumnos/eliminar_alumnos', component: EliminarAlumnosComponent},
        {path: 'admin_alumnos/modificar_alumnos', component: ModificarAlumnosComponent},
        {path: 'admin_clases', component: AdminClasesComponent},
        {path: 'admin_grados', component: AdminGradosComponent},
        {path: 'admin_maestros', component: AdminMaestrosComponent},
        {path: 'admin_padres', component: AdminPadresComponent}
    ]
  },
  {path: '**',  redirectTo: 'login'}
];
