//Native imports
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 

//Third party libraries imports
import { default as swal } from 'sweetalert2';

//Providers imports
import { LoginService } from './login.service';

@Component({
  selector: 'login',
  templateUrl: 'login.template.html'
})


export class LoginComponent implements OnInit{
  //Component varibles

  //login_form FormGroup to be used as a Model Driven Form
  public login_form:FormGroup;
  //submitLogin keeps track on weather the form has been submitted or not (in order to display errors, if any)
  public submitLogin:Boolean;
  //loader is a boolean that whenever it's set to TRUE, the spinner animation on the Sign in button will be activated
  public loader:Boolean;

  //LoginComponent Constructor, FormBuilder reference, LoginService reference, and Router reference
  constructor(form_builder: FormBuilder, private service : LoginService, private router:Router){
    //submitLogin is false when the component loads
    this.submitLogin = false;
    this.loader = false;
    //We set the validators and initial values of the fields contained within the login_form
    this.login_form = form_builder.group({
      'username_email' : [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
      'password': [null, Validators.compose([Validators.required, Validators.maxLength(25)])]
    })
  }

  ngOnInit(){
  }

  login(){
    //if register_form is valid
    if(this.login_form.valid){
      this.loader = true;
      var load = {
        username:this.login_form.controls['username_email'].value, 
        password:this.login_form.controls['password'].value
      };
      var response;
      this.service.login(load).subscribe(
        //store response
        data => response = data[0],
        err => {console.log(err); this.internalServerError();this.loader = false;},
        ()=> {
          if(response && response!=-1){
            if(response.success_status == -1){
              this.loginError();
              this.loader = false;
            }else if(response.success_status == 1){
              sessionStorage.setItem('loginInfo', JSON.stringify(response));
              this.get_user(response.codigo, response.perfil_id);
            }else{
              console.log(response);
              this.internalServerError();
              this.loader = false;
            }
          }else{
            this.internalServerError();
            this.loader = false;
          }
        }
        );
    }else{
      this.submitLogin = true;
      this.loader = false;
    }

  }

  get_user(codigo, perfil){
      var load = {
        codigo:codigo, 
        perfil:perfil
      };
      var response;
      this.service.get_user(load).subscribe(
        //store response
      data => response = data[0],
      err => {console.log(err); this.internalServerError();this.loader = false;},
      ()=> {
        if(response && response!=-1){
          sessionStorage.setItem('userInfo', JSON.stringify(response));
          console.log(sessionStorage.getItem('userInfo'));
          console.log(sessionStorage.getItem('loginInfo'));
          this.loader = false;
          this.router.navigateByUrl('/plataforma/inicio');
        }else{
          this.internalServerError();
          this.loader = false;
        }
      }
      );

  }



  //loginError(): Alerts the user if their password or username is incorrect
  loginError() {
    swal({
      title: "Usuario o Contraseña Incorrectos",
      text: "Las credenciales proporcionadas son inválidas, por favor intente de nuevo.",
      type: "error",
      allowOutsideClick: false
    }).catch(swal.noop)
  }

  //internalServerError(): Alerts the user if there is any error when trying to communicate with the backend server
  internalServerError() {
    swal({
      title: "Error Interno del Servidor",
      text: "Error interno del servidor, inténtalo más tarde.",
      type: "warning",
      allowOutsideClick: false
    }).catch(swal.noop)
  }
}
