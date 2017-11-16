import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MaestroTareasService } from '../maestro_tareas.service';
import { CalificacionesTareasService } from '../maestro_calificaciones.service';
import { AdminMaestrosService } from './../../admin_maestros/admin_maestros.service';
import { AdminAlumnosService } from './../../admin_alumnos/admin_alumnos.service';
import { AdminSeccionesService } from './../../admin_secciones/admin_secciones.service';

@Component({
  selector: 'ver_calificaciones',
  templateUrl: 'ver_calificaciones.template.html'
})


export class CalificacionesTareasComponent implements OnInit{
	public sub:any;
	public secciones:any;
	public tareas:any;
	public id:number;
	public alumnos:any;
	public order:string;
	public ascendent:boolean;
	public requestOffsetRight:number;//requestTable offset to control request browsing
	public requestOffsetLeft:number;//requestTable offset to control request browsing
	public offsetView:number;
	public temp_alumnos:any;
	public search_string:string;
	public agregar_alumnos_form:FormGroup;
	public submit_add:boolean;
	public alumnost:any;
	public tarea:any;

	constructor(form_builder: FormBuilder, private router:Router,private servicec:CalificacionesTareasService, private servicea:AdminAlumnosService, private services:AdminSeccionesService, private service:MaestroTareasService,private Router:ActivatedRoute){
		this.submit_add = false;
		this.tarea=0;
			this.agregar_alumnos_form = form_builder.group({
			'nombres' : ["", Validators.required],
			'valor' : ["", Validators.required],
			
			'alumno_id':["", Validators.required]
		})
		this.order = "";
		this.ascendent = false;
		this.tareas=[];
		this.requestOffsetRight = 0;//set as 0
		this.requestOffsetLeft = 0;//set as 0
		this.offsetView = 5;
		this.alumnos = [];
		this.temp_alumnos = [];
		this.search_string = "";
		this.alumnost=[];
		this.secciones=[];
	}

	ngOnInit() {
		this.sub= this.Router.params.subscribe(params => {
			this.id=params['id']; 
		  //   console.log(this.Router.params);
		  console.log('dfasdfasfdafdasfadfads')
			console.log(params);
		 });
		 this.get_alumnos();
		 this.getsecciones();
		 this.gettareas();
		 for(let i=0;i<1000;i++){
			 console.log("ttttt")
		 }
		
		 this.getalumnos();
		 
	}

	modificar_alumno(){
		if(this.agregar_alumnos_form.valid){
		  this.submit_add = true;
		
		
		  var load = {
			IDalumno:this.agregar_alumnos_form.controls['alumno_id'].value, 
			valor:this.agregar_alumnos_form.controls['valor'].value, 
			parcial:0,
			IDseccion:this.tarea[0].IDseccion,
			IDtarea:this.tarea[0].IDtarea,
			
		  };
		  var response;
		  this.servicec.insert_calificacion(load).subscribe(
			//store respon
			data => response = data,
			err => console.log(err),
			()=> {
				if(response && response!=-1){//if not null, undefined,  or error
				  this.modificar_success();
				  this.submit_add = false;
				}else{
				  this.internalServerError();
				}
			}
		  );
		}else{
		  this.submit_add = true;
		}
	}

	
	
	getalumnos(){
		let idseccion=0;
		let i;
		for(i=0;i<this.tareas.length;i++){
			if(this.tareas[i].IDtarea==this.id){
				idseccion=this.tareas[i].IDSeccion;
				this.tarea=this.tareas[i];

			}
		}
		console.log(this.tarea);
		let idgrado;
		for(i=0;i<this.secciones.length;i++){
			if(this.secciones[i].IDseccion==idseccion){
				idgrado=this.secciones[i].IDgrado;

			}
		}
		console.log(idgrado)
		for(i=0;i<this.alumnos.length;i++){
			if(this.alumnos[i].IDgrdo==idgrado){
				this.alumnost.push(this.alumnos[i]);

			}
		}
		console.log(this.alumnost);

	}
	getsecciones(){
		var response;
		this.services.get_secciones().subscribe(
			//store response
			data => response = data,
			err => console.log(err),
			()=> {
				if(response && response != -1){//if not null
					this.secciones = response;
					console.log("ssssssssssssssss");
					console.log(this.secciones);
				}else{
					this.secciones = [];
			
				}
			   
			}
		);
	}
	gettareas(){
		var response;
		this.service.get_tareas().subscribe(
			//store response
			data => response = data,
			err => console.log(err),
			()=> {
				if(response && response != -1){//if not null
					this.tareas = response;
					console.log("ssssssssssssssss");
					console.log(this.tareas);
				}else{
					this.tareas = [];
			
				}
			   
			}
		);
	}
	get_alumnos(){
		var response;
		this.servicea.get_alumnos().subscribe(
			//store response
			data => response = data,
			err => console.log(err),
			()=> {
				if(response && response != -1){//if not null
					this.alumnos = response;
					console.log("ssssssssssssssssaaaaaaaaaaa");
					console.log(this.alumnos);
				}else{
					this.alumnos = [];
			
				}
			   
			}
		);
	}
	update_offsets(){
		if(this.alumnost.length > 0){
			//Verify if requestOffsetRight overloads requests length
			if(this.alumnost.length < this.offsetView){
				this.requestOffsetRight = this.alumnost.length;
			}else{//if not, set to 5
				this.requestOffsetRight = this.offsetView;
			}
			this.requestOffsetLeft = 1;
		}else{
			this.requestOffsetRight = 0;//set as 0
			this.requestOffsetLeft = 0;//set as 0
		}
	}

	set_alumno(id){
		this.submit_add = false;
		this.agregar_alumnos_form.controls['alumno_id'].setValue(this.alumnost[id].codigo);
		this.agregar_alumnos_form.controls['nombres'].setValue(this.alumnost[id].nombres);
		
		
	}

	search_alumno(){
		this.alumnos = [];
		if(this.search_string.trim().length > 0){
			for(var i = 0; i<this.temp_alumnos.length;i++){
				if(this.temp_alumnos[i].nombres.toLowerCase().includes(this.search_string.toLowerCase().trim()) || this.temp_alumnos[i].apellidos.toLowerCase().includes(this.search_string.toLowerCase().trim()) || (this.temp_alumnos[i].alumno_id+"").toLowerCase().includes(this.search_string.toLowerCase().trim())){
					this.alumnos.push(this.temp_alumnos[i]);
				}
			}
			this.update_offsets();
		}else{
			this.alumnos = this.temp_alumnos;
			this.update_offsets();
		}
		
	}

	sort_nombre(){
		if(this.order == "nombre" && this.ascendent == false){
			this.ascendent = true;
			this.sort_nombre_asc();
		}else if(this.order == "nombre" && this.ascendent == true){
			this.ascendent = false;
			this.sort_nombre_desc();
		}else{
			this.order = "nombre";
			this.ascendent = false;
			this.sort_nombre_desc();
		}

	}

	sort_nombre_asc(){
		this.alumnos.sort(function(a, b){
			var x = a.nombres.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			var y = b.nombres.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			if (x < y) {return 1;}
			if (x > y) {return -1;}
			return 0;
		});
	}

	sort_nombre_desc(){
		this.alumnos.sort(function(a, b){
			var x = a.nombres.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			var y = b.nombres.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			if (x < y) {return -1;}
			if (x > y) {return 1;}
			return 0;
		});
	}

	sort_id(){
		if(this.order == "id" && this.ascendent == false){
			this.ascendent = true;
			this.sort_id_asc();
		}else if(this.order == "id" && this.ascendent == true){
			this.ascendent = false;
			this.sort_id_desc();
		}else{
			this.order = "id";
			this.ascendent = false;
			this.sort_id_desc();
		}

	}

	sort_id_asc(){
		this.alumnos.sort(function(a, b){
			var x = a.alumno_id;
			var y = b.alumno_id;
			if (x < y) {return 1;}
			if (x > y) {return -1;}
			return 0;
		});
	}

	sort_id_desc(){
		this.alumnos.sort(function(a, b){
			var x = a.alumno_id;
			var y = b.alumno_id;
			if (x < y) {return -1;}
			if (x > y) {return 1;}
			return 0;
		});
	}

	sort_apellido(){
		if(this.order == "apellido" && this.ascendent == false){
			this.ascendent = true;
			this.sort_apellido_asc();
		}else if(this.order == "apellido" && this.ascendent == true){
			this.ascendent = false;
			this.sort_apellido_desc();
		}else{
			this.order = "apellido";
			this.ascendent = false;
			this.sort_apellido_desc();
		}

	}

	sort_apellido_asc(){
		this.alumnos.sort(function(a, b){
			var x = a.apellidos.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			var y = b.apellidos.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			if (x < y) {return 1;}
			if (x > y) {return -1;}
			return 0;
		});
	}

	sort_apellido_desc(){
		this.alumnos.sort(function(a, b){
			var x = a.apellidos.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			var y = b.apellidos.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			if (x < y) {return -1;}
			if (x > y) {return 1;}
			return 0;
		});
	}

	updateRequestsGoRight(){
		if(this.alumnost.length > 0){
			//Verify if requestOffsetRight overloads requests length
			if(this.alumnost.length< this.requestOffsetRight+this.offsetView){
				this.requestOffsetRight = this.alumnost.length;
			}else{//if not, set to 5
				this.requestOffsetRight = this.requestOffsetRight + this.offsetView;
			}
			this.requestOffsetLeft = this.requestOffsetLeft + this.offsetView;
		}
	}

	//updateRequestsGoLeft(): Update requests offsets when user clicks left arrow
	updateRequestsGoLeft(){
		if(this.alumnost.length > 0){
			//check if last element
			if(this.alumnost.length == this.requestOffsetRight){
				this.requestOffsetLeft = this.requestOffsetLeft - this.offsetView;
				this.requestOffsetRight = this.requestOffsetLeft + this.offsetView - 1;
			}else{//if not last element
				this.requestOffsetLeft = this.requestOffsetLeft - this.offsetView;
				this.requestOffsetRight = this.requestOffsetRight - this.offsetView;
			}
		}
	}

	modificar_success() {
	  swal({
		  title: "Modificado Exitosamente",
		  text: "Alumno modificado de forma exitosa.",
		  confirmButtonText: '<i class="fa fa-thumbs-up"></i> Regresar',
		  allowOutsideClick: false,
		  type: "success"
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