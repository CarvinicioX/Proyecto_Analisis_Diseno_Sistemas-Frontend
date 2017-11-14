import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { MaestroTareasService } from '../maestro_tareas.service';

@Component({
  selector: 'eliminar_tareas',
  templateUrl: 'eliminar_tareas.template.html'
})


export class EliminarTareasComponent implements OnInit{

	public alumnos:any;
	public order:string;
	public ascendent:boolean;
	public requestOffsetRight:number;//requestTable offset to control request browsing
	public requestOffsetLeft:number;//requestTable offset to control request browsing
	public offsetView:number;
	public temp_alumnos:any;
	public search_string:string;
	public alumno_nombre:string;
	public alumno_apellido:string;
	public alumno_id:number;
	public alumno_departamento:string;
	public alumno_nacimiento:string;

	constructor(private router:Router, private service:MaestroTareasService){
		this.order = "";
		this.ascendent = false;
		this.requestOffsetRight = 0;//set as 0
		this.requestOffsetLeft = 0;//set as 0
		this.offsetView = 5;
		this.alumnos = [];
		this.temp_alumnos = [];
		this.search_string = "";
		this.alumno_nombre = "";
		this.alumno_apellido = "";
		this.alumno_nacimiento = "";
		this.alumno_departamento = "";
		this.alumno_id = null;
	}

	ngOnInit() {
		
		
	}

	eliminar_alumno(){
		var load = {alumno_id:this.alumno_id};
		var response;
		this.service.delete_tarea(load).subscribe(
			//store response
			data => response = data,
			err => console.log(err),
			()=> {
				if(response && response != -1){//if not null
					for(var i = 0; i<this.alumnos.length;i++){
						if(this.alumnos[i].alumno_id == this.alumno_id){
							this.alumnos.splice(i,1);
						}
					}
					for(var i = 0; i<this.temp_alumnos.length;i++){
						if(this.temp_alumnos[i].alumno_id == this.alumno_id){
							this.temp_alumnos.splice(i,1);
						}
					}
					this.update_offsets();
					this.alumno_nombre = "";
					this.alumno_apellido = "";
					this.alumno_nacimiento = "";
					this.alumno_departamento = "";
					this.alumno_id = null;
					this.eliminar_success();
				}else{
					this.internalServerError();
				}
			   
			}
		);
		

		

	}

	

	update_offsets(){
		if(this.alumnos.length > 0){
			//Verify if requestOffsetRight overloads requests length
			if(this.alumnos.length < this.offsetView){
				this.requestOffsetRight = this.alumnos.length;
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
		this.alumno_nombre = this.alumnos[id].nombres;
		this.alumno_apellido = this.alumnos[id].apellidos;
		this.alumno_departamento = this.alumnos[id].departamento;
		this.alumno_nacimiento = this.alumnos[id].nacimiento.substring(0,10);
		this.alumno_id = this.alumnos[id].alumno_id;
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
		if(this.alumnos.length > 0){
			//Verify if requestOffsetRight overloads requests length
			if(this.alumnos.length< this.requestOffsetRight+this.offsetView){
				this.requestOffsetRight = this.alumnos.length;
			}else{//if not, set to 5
				this.requestOffsetRight = this.requestOffsetRight + this.offsetView;
			}
			this.requestOffsetLeft = this.requestOffsetLeft + this.offsetView;
		}
	}

	//updateRequestsGoLeft(): Update requests offsets when user clicks left arrow
	updateRequestsGoLeft(){
		if(this.alumnos.length > 0){
			//check if last element
			if(this.alumnos.length == this.requestOffsetRight){
				this.requestOffsetLeft = this.requestOffsetLeft - this.offsetView;
				this.requestOffsetRight = this.requestOffsetLeft + this.offsetView - 1;
			}else{//if not last element
				this.requestOffsetLeft = this.requestOffsetLeft - this.offsetView;
				this.requestOffsetRight = this.requestOffsetRight - this.offsetView;
			}
		}
	}

	eliminar_success() {
	  swal({
		  title: "Eliminado Exitosamente",
		  text: "Alumno eliminado de forma exitosa.",
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