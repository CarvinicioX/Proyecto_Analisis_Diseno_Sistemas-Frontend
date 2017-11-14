import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { MaestroTareasService } from '../maestro_tareas.service';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

@Component({
  selector: 'agregar_tareas',
  templateUrl: 'agregar_tareas.template.html'
})


export class AgregarTareasComponent implements OnInit{
  public sub:any;
  public id:number;
	public agregar_tareas_form:FormGroup;
	public submit_add:boolean;
  public adding:boolean;
	constructor(form_builder: FormBuilder, private router:Router, private service:MaestroTareasService,private Router:ActivatedRoute){
    this.adding = false;
		this.submit_add = false;
		this.agregar_tareas_form = form_builder.group({
            'entrega' : ["", Validators.required],
            'asignada' : ["", Validators.required],

            'nombre': ["", Validators.required],
            'tipo' : ["", Validators.required],
            'descripcion' : ["", Validators.required],
            'valor': ["", Validators.required],
            'parcial': ["", Validators.required],
           
        })
	}

	ngOnInit() {
    this.sub= this.Router.params.subscribe(params => {
      this.id=params['id']; 
    //   console.log(this.Router.params);
    console.log('dfasdfasfdafdasfadfads')
      console.log(params);
   });
  }

  agregar_tarea(){
    if(this.agregar_tareas_form.valid){
      this.submit_add = true;
      this.adding = true;
      console.log(sessionStorage.getItem("logininfo"));
      var load = {
        entrega:this.agregar_tareas_form.controls['entrega'].value,
        asignada:this.agregar_tareas_form.controls['asignada'].value,
        entregada:0,
        IDseccion:+this.id,
        nombre:this.agregar_tareas_form.controls['nombre'].value, 

        tipo:this.agregar_tareas_form.controls['tipo'].value,
        
        descripcion:this.agregar_tareas_form.controls['descripcion'].value, 
        valor: this.agregar_tareas_form.controls['valor'].value,


      };
      console.log(load);
      var response;
      this.service.insert_tarea(load).subscribe(
        //store response
        data => response = data[0],
        err => {console.log(err);this.internalServerError();this.adding = false;},
        ()=> {
            if(response && response!=-1){//if not null, undefined,  or error
      //        console.log(response);
              this.agregar_success(response.hash);
              this.adding = false;
            }else{
              console.log(response)
              this.agregar_success2();
              //this.internalServerError();
              this.adding = false;
            }
        }
      );
    }else{
      this.submit_add = true;
      this.adding = false;
    }
  }

  clear_tarea(){
    this.agregar_tareas_form.controls['nombre'].setValue("");
    this.agregar_tareas_form.controls['tipo'].setValue("");
    this.agregar_tareas_form.controls['entregada'].setValue("");
    this.agregar_tareas_form.controls['asignada'].setValue("");
    this.agregar_tareas_form.controls['valor'].setValue("");
    this.agregar_tareas_form.controls['descripcion'].setValue("");
    this.submit_add = false;
  }

  agregar_success(hash) {
      swal({
          title: "Agregado Exitosamente",
          text: "Tarea agregado de forma exitosa.",
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
          this.clear_tarea();
        })
      }).catch(swal.noop)
  }

  agregar_success2(){
    swal({
      title: "Agregado Exitosamente",
      text: "Tarea agregado de forma exitosa.",
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Regresar',
      allowOutsideClick: false,
        type: "success"
   })

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