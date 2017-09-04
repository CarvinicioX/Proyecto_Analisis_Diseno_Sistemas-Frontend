//Native Imports
import {Routes} from "@angular/router";

//Component Imports
import {LoginComponent} from "./views/login/login.component";
import {RegisterComponent} from "./views/register/register.component";
import {NewRequestComponent} from "./views/new_request/new_request.component";
import {HomeComponent} from "./views/home/home.component";
import {BasicLayoutComponent} from "./components/common/layouts/basicLayout.component";


export const ROUTES:Routes = [
  	{path: 'login', component: LoginComponent},
  	{path: 'register', component: RegisterComponent},
  	{path: 'dashboard', component: BasicLayoutComponent, 
    children: [
      	{path: 'new_request', component: NewRequestComponent},
      	{path: 'home', component: HomeComponent}
    ]
  },
  {path: '**',  redirectTo: 'login'}
];
