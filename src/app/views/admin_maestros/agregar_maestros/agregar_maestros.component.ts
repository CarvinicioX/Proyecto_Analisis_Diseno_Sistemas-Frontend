import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { AdminMaestrosService } from '../admin_maestros.service';

@Component({
  selector: 'agregar_maestros',
  templateUrl: 'agregar_maestros.template.html'
})


export class AgregarMaestrosComponent implements OnInit{

	public agregar_maestros_form:FormGroup;
	public submit_add:boolean;
  public adding:boolean;
	constructor(form_builder: FormBuilder, private router:Router, private service:AdminMaestrosService){
    this.adding = false;
		this.submit_add = false;
		this.agregar_maestros_form = form_builder.group({
            'nombre' : ["", Validators.required],
            'telefono' : ["", Validators.required],
            'nacimiento' : ["", Validators.required],
            'departamento' : ["", Validators.required]
        })
	}

	ngOnInit() {
  }

  agregar_maestro(){
    if(this.agregar_maestros_form.valid){
      this.submit_add = true;
      this.adding = true;
      var nacimiento_temp = new Date(this.agregar_maestros_form.controls['nacimiento'].value);
      var date_string = nacimiento_temp.toISOString().slice(0, 10).replace('T', ' ');
      var load = {
        nombre:this.agregar_maestros_form.controls['nombre'].value,
        telefono:this.agregar_maestros_form.controls['telefono'].value, 
        birth_date: date_string,
        direccion: this.agregar_maestros_form.controls['departamento'].value,
        email:''
      };
//      alert(this.agregar_maestros_form.controls['nombre'].value);
      var response;
      this.service.insert_maestro(load).subscribe(
        //store response
        data => response = data[0],
        err => {console.log(err);this.adding = false;this.internalServerError();},
        ()=> {
            if(response && response!=-1){//if not null, undefined,  or error
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

  clear_maestro(){
    this.agregar_maestros_form.controls['nombre'].setValue("");
    this.agregar_maestros_form.controls['telefono'].setValue("");
    this.agregar_maestros_form.controls['nacimiento'].setValue("");
    this.agregar_maestros_form.controls['departamento'].setValue("");
    this.submit_add = false;
  }

  agregar_success(hash) {
      swal({
          title: "Agregado Exitosamente",
          text: "Maestro agregado de forma exitosa.",
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
          this.clear_maestro();
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