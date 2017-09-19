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

	private agregar_padres_form:FormGroup;
	private submit_add:boolean;
	constructor(form_builder: FormBuilder, private router:Router, private service:AdminPadresService){
		this.submit_add = false;
		this.agregar_padres_form = form_builder.group({
            'nombres' : ["", Validators.required],
            'apellidos' : ["", Validators.required],
            'nacimiento' : ["", Validators.required],
            'departamento' : ["", Validators.required],
            'id' : [{value: "", disabled: true}, ]
        })
	}

	ngOnInit() {
  }

  agregar_padre(){
    if(this.agregar_padres_form.valid){
      this.submit_add = true;
      var nacimiento_temp = new Date(this.agregar_padres_form.controls['nacimiento'].value);
      var date_string = nacimiento_temp.toISOString().slice(0, 10).replace('T', ' ');
      var load = {
        nombres:this.agregar_padres_form.controls['nombres'].value, 
        apellidos:this.agregar_padres_form.controls['apellidos'].value, 
        nacimiento: date_string,
        departamento: this.agregar_padres_form.controls['departamento'].value
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
    this.agregar_padres_form.controls['nombres'].setValue("");
    this.agregar_padres_form.controls['apellidos'].setValue("");
    this.agregar_padres_form.controls['nacimiento'].setValue("");
    this.agregar_padres_form.controls['departamento'].setValue("");
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
