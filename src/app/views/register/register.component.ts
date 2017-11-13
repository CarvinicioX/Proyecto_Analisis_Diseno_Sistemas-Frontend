//Native imports
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';

//Third party libraries imports
import { default as swal } from 'sweetalert2';
import {ModalDirective} from 'ngx-bootstrap';

//Providers imports
import { RegisterService } from './register.service';


@Component({
  selector: 'register',
  templateUrl: 'register.template.html'
})

export class RegisterComponent implements OnInit{
	//Component varibles

	//register_form FormGroup to be used as a Model Driven Form
	public register_form:FormGroup;
	//submitRegister keeps track if the register_form has been submitted
	public submitRegister:Boolean;
	//loader is a boolean that whenever it's set to TRUE, the spinner animation on the Sign up button will be activated
	public loader:Boolean;
    public hash_mask:any;
	//LoginComponent Constructor, FormBuilder reference, Router reference, RegisterService reference
	constructor(form_builder: FormBuilder, private router:Router, private service : RegisterService){
		this.submitRegister = false;
		this.loader = false;
        this.hash_mask = [/./,/./,/./,/./,/./,/./,/./,/./,'-', /./,/./,/./,/./];
		//We set the validators and initial values of the fields contained within the register_form
	    this.register_form = form_builder.group({
	    	'email' : ["", Validators.compose([Validators.required, Validators.maxLength(100), Validators.email])],
	    	'password' : ["", Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(8)])],
	    	'confirm_password' : ["", Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(8)])],
        'hash' : ["", Validators.compose([Validators.required])]
	    },{validator: this.matchingPasswords('password', 'confirm_password')})//We add our custom validator
	}

	//matchingPasswords is a custom validator that verifies if the password input matches the verify password input
	matchingPasswords = function(passwordKey: string, confirmPasswordKey: string) {
	  	return (group: FormGroup): {[key: string]: any} => {
		    let password = group.controls[passwordKey];
		    let confirmPassword = group.controls[confirmPasswordKey];
		    //verify if passwords match
		    if (password.value !== confirmPassword.value) {
			    return {//Return validator key:value
			        mismatchedPasswords: true
			    };
		    }
		}
	}

	
	ngOnInit() {

    }


    register(){
    	//if register_form is valid
    	if(this.register_form.valid){
			this.loader = true;
            var load = {
                username:this.register_form.controls['email'].value, 
                password:this.register_form.controls['password'].value, 
                hash: this.register_form.controls['hash'].value
            };
            var response;
            this.service.register(load).subscribe(
            //store response
            data => response = data[0],
            err => {console.log(err); this.internalServerError();this.loader = false;},
            ()=> {
              if(response && response!=-1){
                if(response.success_status == -3){
                  this.usernameAlreadyExists();
                }else if(response.success_status == -2){
                  this.wrongHash();
                }else if(response.success_status == -1){
                  this.hashAlreadyUsed();
                }else if(response.success_status == 0){
                  this.registerSuccess();
                }
                this.loader = false;
              }else{
                this.internalServerError();
                this.loader = false;
              }
            }
          );
    	}else{
    		this.submitRegister = true;
        this.loader = false;
    	}
    	
  	}


  	//registerSuccess(): Alerts user if their registration was succesful, redirecting them to login route afterwards
  	registerSuccess() {
        swal({
            title: "Registrado Exitosamente",
            text: "Ahora te puedes conectar a la plataforma virtual de aprendizaje.",
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Conectarse',
            allowOutsideClick: false,
            type: "success"
        }).then(
			()=>{
				this.router.navigate(['/login']);
			}
        );
    }

    //internalServerError(): Alerts the user if there is any error when trying to communicate with the backend server
    internalServerError() {
    	swal({
            title: "Error Interno del Servidor",
            text: "Error interno del servidor, favor revisar su conexión de internet o inténtelo más tarde",
            type: "warning",
            allowOutsideClick: false
        }).catch(swal.noop)
    }

    //usernameAlreadyExists(): Alerts the user if the username they provided already exists
    usernameAlreadyExists() {
    	swal({
            title: "Correo Existe",
            text: "El correo proporcionado ya pertenece a un usuario dentro del sistema",
            type: "error",
            allowOutsideClick: false
        }).catch(swal.noop)
    }

    //usernameAlreadyExists(): Alerts the user if the username they provided already exists
    hashAlreadyUsed() {
        swal({
            title: "Código Secreto Caducado",
            text: "El código secreto proporcionado ya fue utilizado para crear otro usuario",
            type: "error",
            allowOutsideClick: false
        }).catch(swal.noop)
    }

    wrongHash() {
        swal({
            title: "Código Secreto Inválido",
            text: "El código secreto proporcionado no existe",
            type: "error",
            allowOutsideClick: false
        }).catch(swal.noop)
    }

}