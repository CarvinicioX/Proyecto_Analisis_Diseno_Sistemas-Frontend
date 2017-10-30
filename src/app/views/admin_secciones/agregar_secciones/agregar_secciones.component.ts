import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { AdminSeccionesService } from '../admin_secciones.service';
import { AdminMaestrosService } from './../../admin_maestros/admin_maestros.service';
import { AdminGradosService } from './../../admin_grados/admin_grados.service';
import { AdminClasesService } from './../../admin_clases/admin_clases.service';

@Component({
  selector: 'agregar_secciones',
  templateUrl: 'agregar_secciones.template.html'
})


export class AgregarSeccionesComponent implements OnInit{

  private agregar_secciones_form:FormGroup;
  private submit_add:boolean;
  private maestros:any;
  private clases:any;
  private grados:any;
  
	constructor(form_builder: FormBuilder, private router:Router, private service:AdminSeccionesService, private servicem:AdminMaestrosService, private serviceg:AdminGradosService, private servicec:AdminClasesService){
    this.submit_add = false;
    this.maestros = [];
    this.clases = [];
    this.grados = [];
		this.agregar_secciones_form = form_builder.group({
            'IDgrado' : ["", Validators.required],
            'IDmaestro' : ["", Validators.required],
            'IDclase' : ["", Validators.required],
            'anio' : ["", Validators.required],
            'id' : [{value: "", disabled: true}, ]
        })
  
	}

	ngOnInit() {
    this.get_clases();
    this.get_grados();
    this.get_maestros();
  }
  

  agregar_seccion(){
    if(this.agregar_secciones_form.valid){
      this.submit_add = true;
      var load = {
        IDgrado:this.agregar_secciones_form.controls['IDgrado'].value, 
        IDmaestro:this.agregar_secciones_form.controls['IDmaestro'].value, 
        IDclase:this.agregar_secciones_form.controls['IDclase'].value,
        anio:this.agregar_secciones_form.controls['anio'].value
      };
      var response;
      this.service.insert_seccion(load).subscribe(
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
  get_maestros(){
    var response;
    this.servicem.get_maestros().subscribe(
        //store response
        data => response = data,
        err => console.log(err),
        ()=> {
            if(response && response != -1){//if not null
                this.maestros = response;
            }else{
                this.maestros = [];
            }
           
        }
    );
}
get_grados(){
  var response;
  this.serviceg.get_grados().subscribe(
      //store response
      data => response = data,
      err => console.log(err),
      ()=> {
          if(response && response != -1){//if not null
              this.grados = response;
              console.log(this.grados);
              console.log("peeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")          
          }else{
              this.grados = [];
             
          }
         
      }
  );
}
get_clases(){
  var response;
  this.servicec.get_clases().subscribe(
      //store response
      data => response = data,
      err => console.log(err),
      ()=> {
          if(response && response != -1){//if not null
              this.clases = response;
       
          }else{
              this.clases = [];
            
          }
         
      }
  );
}
set_clases(){


}
set_maestros(){
  

}
set_grados(){
   

}

  clear_seccion(){
    this.agregar_secciones_form.controls['IDgrado'].setValue("");
    this.agregar_secciones_form.controls['IDmaestro'].setValue("");
    this.agregar_secciones_form.controls['IDclase'].setValue("");
    this.agregar_secciones_form.controls['anio'].setValue("");
    this.submit_add = false;
  }

  agregar_success() {
      swal({
          title: "Agregado Exitosamente",
          text: "Seccion agregado de forma exitosa.",
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> Regresar',
          allowOutsideClick: false,
          type: "success"
      }).then(()=>{this.clear_seccion();})
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


