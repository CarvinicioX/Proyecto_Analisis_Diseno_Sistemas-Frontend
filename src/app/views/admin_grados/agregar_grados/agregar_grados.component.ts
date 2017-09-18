import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { AdminGradosService } from '../admin_grados.service';

@Component({
  selector: 'agregar_grados',
  templateUrl: 'agregar_grados.template.html'
})


export class AgregarGradosComponent implements OnInit{

	private agregar_grados_form:FormGroup;
	private submit_add:boolean;
	constructor(form_builder: FormBuilder, private router:Router, private service:AdminGradosService){
		this.submit_add = false;
		this.agregar_grados_form = form_builder.group({
            'grado' : ["", Validators.required],
            'id' : [{value: "", disabled: true}, ]
        })
	}

	ngOnInit() {
  }

  agregar_grado(){
    if(this.agregar_grados_form.valid){
      this.submit_add = true;
      var load = {
        grado: this.agregar_grados_form.controls['grado'].value
      };
      console.log(load);
      var response;
      this.service.insert_grado(load).subscribe(
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

  clear_grado(){
    this.agregar_grados_form.controls['grado'].setValue("");
    this.submit_add = false;
  }

  agregar_success() {
      swal({
          title: "Agregado Exitosamente",
          text: "Grado agregado de forma exitosa.",
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> Regresar',
          allowOutsideClick: false,
          type: "success"
      }).then(()=>{this.clear_grado();})
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