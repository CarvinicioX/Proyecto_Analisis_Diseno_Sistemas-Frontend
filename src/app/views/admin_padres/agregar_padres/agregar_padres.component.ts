import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { AdminPadresService } from '../admin_padres.service';

	@Component({
  selector: 'agregar_padres',
  templateUrl: 'agregar_padres.template.html'
})


export class AgregarPadresComponent implements OnInit{

	public agregar_padres_form:FormGroup;
	public submit_add:boolean;
	constructor(form_builder: FormBuilder, private router:Router, private service:AdminPadresService){
		this.submit_add = false;
		this.agregar_padres_form = form_builder.group({
            'nombre' : ["", Validators.required],
            'telefono' : ["", Validators.required],
            'direccion' : ["", Validators.required],
            'correo' : ["", Validators.required],
            'id' : [{value: "", disabled: true}, ]
        })
	}

	ngOnInit() {
  }

  agregar_padre(){
    if(this.agregar_padres_form.valid){
      this.submit_add = true;
      var load = {
        nombre:this.agregar_padres_form.controls['nombre'].value, 
        telefono:this.agregar_padres_form.controls['telefono'].value, 
	      direccion:this.agregar_padres_form.controls['direccion'].value,
        correo:this.agregar_padres_form.controls['correo'].value
      };
      var response;
      this.service.insert_padre(load).subscribe(
        //store response
        data => response = data,
        err => console.log(err),
        ()=> {
            if(response && response!=-1){//if not null, undefined,  or error
              this.agregar_success();
            }else{
              this.internalServerError();
            }
        }
      );
    }else{
      this.submit_add = true;
    }
  }

  clear_padre(){
    this.agregar_padres_form.controls['nombre'].setValue("");
    this.agregar_padres_form.controls['telefono'].setValue("");
    this.agregar_padres_form.controls['direccion'].setValue("");
    this.agregar_padres_form.controls['correo'].setValue("");
    this.submit_add = false;
  }

  agregar_success() {
      swal({
          title: "Agregado Exitosamente",
          text: "Padre agregado de forma exitosa.",
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> Regresar',
          allowOutsideClick: false,
          type: "success"
      }).then(()=>{this.clear_padre();})
  }

  internalServerError() {
    swal({
          title: "Error Interno del Servidor",
          text: "Error interno del servidor, por favor vuelva a intentarlo o contacte a su administrador.",
          type: "warning",
          allowOutsideClick: false
      }).catch(swal.noop)
  }
}
