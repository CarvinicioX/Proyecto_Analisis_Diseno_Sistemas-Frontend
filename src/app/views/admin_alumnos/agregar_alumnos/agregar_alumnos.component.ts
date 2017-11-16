import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { AdminAlumnosService } from '../admin_alumnos.service';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

@Component({
  selector: 'agregar_alumnos',
  templateUrl: 'agregar_alumnos.template.html'
})


export class AgregarAlumnosComponent implements OnInit{

	public agregar_alumnos_form:FormGroup;
	public submit_add:boolean;
  public adding:boolean;
	constructor(form_builder: FormBuilder, private router:Router, private service:AdminAlumnosService){
    this.adding = false;
		this.submit_add = false;
		this.agregar_alumnos_form = form_builder.group({
            'nombres' : ["", Validators.required],
            'apellidos' : ["", Validators.required],
            'nacimiento' : ["", Validators.required],
            'nacimiento_temporal' :[""],
            'departamento' : ["", Validators.required]
        })
	}

	ngOnInit() {
  }

  agregar_alumno(){
    if(this.agregar_alumnos_form.valid){
      this.submit_add = true;
      this.adding = true;
      var nacimiento_temp = new Date(this.agregar_alumnos_form.controls['nacimiento'].value);
      var date_string = nacimiento_temp.toISOString().slice(0, 10).replace('T', ' ');
      var load = {
        nombres:this.agregar_alumnos_form.controls['nombres'].value, 
        apellidos:this.agregar_alumnos_form.controls['apellidos'].value, 
        nacimiento: date_string,
        departamento: this.agregar_alumnos_form.controls['departamento'].value,
        //iDgrado:0
      };
      var response;
      this.service.insert_alumno(load).subscribe(
        //store response
        data => response = data[0],
        err => {console.log(err);this.internalServerError();this.adding = false;},
        ()=> {
            if(response && response!=-1){//if not null, undefined,  or error
              console.log(response);
              this.agregar_success(response.hash);
              this.adding = false;
            }else{
              this.internalServerError();
              this.adding = false;
            }
        }
      );
    }else{
      this.submit_add = true;
      this.adding = false;
    }
  }

  clear_alumno(){
    this.agregar_alumnos_form.controls['nombres'].setValue("");
    this.agregar_alumnos_form.controls['apellidos'].setValue("");
    this.agregar_alumnos_form.controls['nacimiento'].setValue("");
    this.agregar_alumnos_form.controls['departamento'].setValue("");
    this.submit_add = false;
  }

  agregar_success(hash) {
      swal({
          title: "Agregado Exitosamente",
          text: "Alumno agregado de forma exitosa.",
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> Ver Código Secreto',
          allowOutsideClick: false,
          type: "success"
      }).then(()=>{
         swal({
          title: hash,
          text: "Guarde el código secreto para poder crear el usuario",
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> Regresar',
          allowOutsideClick: false,
          type: "success"
        }).then(()=>{
          this.clear_alumno();
        })
      }).catch(swal.noop)
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