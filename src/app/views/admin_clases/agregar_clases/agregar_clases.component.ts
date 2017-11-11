import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { AdminClasesService } from '../admin_clases.service';

@Component({
  selector: 'agregar_clases',
  templateUrl: 'agregar_clases.template.html'
})


export class AgregarClasesComponent implements OnInit{

	public agregar_clases_form:FormGroup;
	public submit_add:boolean;
	constructor(form_builder: FormBuilder, private router:Router, private service:AdminClasesService){
		this.submit_add = false;
		this.agregar_clases_form = form_builder.group({
            'nombre' : ["", Validators.required],
            'id' : [{value: "", disabled: true}, ]
        })
	}

	ngOnInit() {
  }

  agregar_clases(){
    if(this.agregar_clases_form.valid){
      this.submit_add = true;
      
      var load = {
        nombre:this.agregar_clases_form.controls['nombre'].value,
      
      };
//      alert(this.agregar_clases_form.controls['nombre'].value);
      var response;
      this.service.insert_clase(load).subscribe(
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

  clear_clase(){
    this.agregar_clases_form.controls['nombre'].setValue("");
    this.submit_add = false;
  }

  agregar_success() {
      swal({
          title: "Agregado Exitosamente",
          text: "Clase agregada de forma exitosa.",
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> Regresar',
          allowOutsideClick: false,
          type: "success"
      }).then(()=>{this.clear_clase();})
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