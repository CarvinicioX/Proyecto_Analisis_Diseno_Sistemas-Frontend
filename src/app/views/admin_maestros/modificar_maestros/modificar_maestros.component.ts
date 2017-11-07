import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { AdminMaestrosService } from '../admin_maestros.service';

@Component({
  selector: 'modificar_maestros',
  templateUrl: 'modificar_maestros.template.html'
})


export class ModificarMaestrosComponent implements OnInit{

	public maestros:any;
	public order:string;
	public ascendent:boolean;
	public requestOffsetRight:number;//requestTable offset to control request browsing
	public requestOffsetLeft:number;//requestTable offset to control request browsing
	public offsetView:number;
	public temp_maestros:any;
	public search_string:string;
	public agregar_maestros_form:FormGroup;
	public submit_add:boolean;

	constructor(form_builder: FormBuilder, private router:Router, private service:AdminMaestrosService){
		this.submit_add = false;
			this.agregar_maestros_form = form_builder.group({
			'nombres' : ["", Validators.required],
			'telefono' : ["", Validators.required],
			'nacimiento' : ["", Validators.required],
			'departamento' : ["", Validators.required],
			'maestro_id':["", Validators.required]
		})
		this.order = "";
		this.ascendent = false;
		this.requestOffsetRight = 0;//set as 0
		this.requestOffsetLeft = 0;//set as 0
		this.offsetView = 5;
		this.maestros = [];
		this.temp_maestros = [];
		this.search_string = "";
	}

	ngOnInit() {
		this.get_maestros();
	}

	modificar_maestro(){
		if(this.agregar_maestros_form.valid){
		  this.submit_add = true;
		  var nacimiento_temp = new Date(this.agregar_maestros_form.controls['nacimiento'].value);
		  var date_string = nacimiento_temp.toISOString().slice(0, 10).replace('T', ' ');
		  var load = {
			nombre:this.agregar_maestros_form.controls['nombres'].value, 
			telefono:this.agregar_maestros_form.controls['telefono'].value, 
			birth_date: date_string,
			direccion: this.agregar_maestros_form.controls['departamento'].value,
			IDmaestro:this.agregar_maestros_form.controls['maestro_id'].value
		  };
		  var response;
		  this.service.update_maestro(load).subscribe(
			//store response
			data => response = data,
			err => console.log(err),
			()=> {
				if(response && response!=-1){//if not null, undefined,  or error
					for(var i = 0; i<this.maestros.length;i++){
						if(this.maestros[i].IDmaestro == this.agregar_maestros_form.controls['maestro_id'].value){
							this.maestros[i].nombre = this.agregar_maestros_form.controls['nombres'].value;
							this.maestros[i].telefono = this.agregar_maestros_form.controls['telefono'].value;
							this.maestros[i].birth_date = this.agregar_maestros_form.controls['nacimiento'].value;
							this.maestros[i].direccion = this.agregar_maestros_form.controls['departamento'].value;
						}
					}
					for(var i = 0; i<this.temp_maestros.length;i++){
						if(this.temp_maestros[i].IDmaestro == this.agregar_maestros_form.controls['maestro_id'].value){
							this.temp_maestros[i].nombre = this.agregar_maestros_form.controls['nombres'].value;
							this.temp_maestros[i].telefono = this.agregar_maestros_form.controls['telefono'].value;
							this.temp_maestros[i].birth_date = this.agregar_maestros_form.controls['nacimiento'].value;
							this.temp_maestros[i].direccion = this.agregar_maestros_form.controls['departamento'].value;
						}
					}
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

	get_maestros(){
		var response;
		this.service.get_maestros().subscribe(
			//store response
			data => response = data,
			err => console.log(err),
			()=> {
				if(response && response != -1){//if not null
					this.maestros = response;
					this.temp_maestros = response;
					this.update_offsets();
				}else{
					this.maestros = [];
					this.temp_maestros = [];
					this.requestOffsetRight = 0;//set as 0
					this.requestOffsetLeft = 0;//set as 0
				}
			   
			}
		);
	}

	update_offsets(){
		if(this.maestros.length > 0){
			//Verify if requestOffsetRight overloads requests length
			if(this.maestros.length < this.offsetView){
				this.requestOffsetRight = this.maestros.length;
			}else{//if not, set to 5
				this.requestOffsetRight = this.offsetView;
			}
			this.requestOffsetLeft = 1;
		}else{
			this.requestOffsetRight = 0;//set as 0
			this.requestOffsetLeft = 0;//set as 0
		}
	}

	set_maestro(id){
		this.submit_add = false;
		this.agregar_maestros_form.controls['maestro_id'].setValue(this.maestros[id].IDmaestro);
		this.agregar_maestros_form.controls['nombres'].setValue(this.maestros[id].nombre);
		this.agregar_maestros_form.controls['telefono'].setValue(this.maestros[id].telefono);
		this.agregar_maestros_form.controls['departamento'].setValue(this.maestros[id].direccion);
		this.agregar_maestros_form.controls['nacimiento'].setValue(this.maestros[id].birth_date.substring(0,10));
		
	}

	search_maestro(){
		this.maestros = [];
		if(this.search_string.trim().length > 0){
			for(var i = 0; i<this.temp_maestros.length;i++){
				if(this.temp_maestros[i].nombre.toLowerCase().includes(this.search_string.toLowerCase().trim()) || this.temp_maestros[i].telefono.toLowerCase().includes(this.search_string.toLowerCase().trim()) || (this.temp_maestros[i].IDmaestro+"").toLowerCase().includes(this.search_string.toLowerCase().trim())){
					this.maestros.push(this.temp_maestros[i]);
				}
			}
			this.update_offsets();
		}else{
			this.maestros = this.temp_maestros;
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
		this.maestros.sort(function(a, b){
			var x = a.nombres.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			var y = b.nombres.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			if (x < y) {return 1;}
			if (x > y) {return -1;}
			return 0;
		});
	}

	sort_nombre_desc(){
		this.maestros.sort(function(a, b){
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
		this.maestros.sort(function(a, b){
			var x = a.maestro_id;
			var y = b.maestro_id;
			if (x < y) {return 1;}
			if (x > y) {return -1;}
			return 0;
		});
	}

	sort_id_desc(){
		this.maestros.sort(function(a, b){
			var x = a.maestro_id;
			var y = b.maestro_id;
			if (x < y) {return -1;}
			if (x > y) {return 1;}
			return 0;
		});
	}

	sort_telefono(){
		if(this.order == "telefono" && this.ascendent == false){
			this.ascendent = true;
			this.sort_telefono_asc();
		}else if(this.order == "telefono" && this.ascendent == true){
			this.ascendent = false;
			this.sort_telefono_desc();
		}else{
			this.order = "telefono";
			this.ascendent = false;
			this.sort_telefono_desc();
		}

	}

	sort_telefono_asc(){
		this.maestros.sort(function(a, b){
			var x = a.telefono.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			var y = b.telefono.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			if (x < y) {return 1;}
			if (x > y) {return -1;}
			return 0;
		});
	}

	sort_telefono_desc(){
		this.maestros.sort(function(a, b){
			var x = a.telefono.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			var y = b.telefono.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			if (x < y) {return -1;}
			if (x > y) {return 1;}
			return 0;
		});
	}

	updateRequestsGoRight(){
		if(this.maestros.length > 0){
			//Verify if requestOffsetRight overloads requests length
			if(this.maestros.length< this.requestOffsetRight+this.offsetView){
				this.requestOffsetRight = this.maestros.length;
			}else{//if not, set to 5
				this.requestOffsetRight = this.requestOffsetRight + this.offsetView;
			}
			this.requestOffsetLeft = this.requestOffsetLeft + this.offsetView;
		}
	}

	//updateRequestsGoLeft(): Update requests offsets when user clicks left arrow
	updateRequestsGoLeft(){
		if(this.maestros.length > 0){
			//check if last element
			if(this.maestros.length == this.requestOffsetRight){
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
		  text: "maestro modificado de forma exitosa.",
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