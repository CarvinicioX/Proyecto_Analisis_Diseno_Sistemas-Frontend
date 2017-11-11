import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { AdminPadresService } from '../admin_padres.service';

@Component({
  selector: 'modificar_padres',
  templateUrl: 'modificar_padres.template.html'
})


export class ModificarPadresComponent implements OnInit{

	public padres:any;
	public order:string;
	public ascendent:boolean;
	public requestOffsetRight:number;//requestTable offset to control request browsing
	public requestOffsetLeft:number;//requestTable offset to control request browsing
	public offsetView:number;
	public temp_padres:any;
	public search_string:string;
	public agregar_padres_form:FormGroup;
	public submit_add:boolean;

	constructor(form_builder: FormBuilder, private router:Router, private service:AdminPadresService){
		this.submit_add = false;
			this.agregar_padres_form = form_builder.group({
			'nombre' : ["", Validators.required],
			'telefono' : ["", Validators.required],
			'correo' : ["", Validators.required],
			'direccion' : ["", Validators.required],
			'IDpadre':["", Validators.required]
		})
		this.order = "";
		this.ascendent = false;
		this.requestOffsetRight = 0;//set as 0
		this.requestOffsetLeft = 0;//set as 0
		this.offsetView = 5;
		this.padres = [];
		this.temp_padres = [];
		this.search_string = "";
	}

	ngOnInit() {
		this.get_padres();
	}

	modificar_padre(){
		if(this.agregar_padres_form.valid){
		  this.submit_add = true;
		  var load = {
			nombre:this.agregar_padres_form.controls['nombre'].value, 
			telefono:this.agregar_padres_form.controls['telefono'].value, 
			correo: this.agregar_padres_form.controls['correo'].value,
			direccion: this.agregar_padres_form.controls['direccion'].value,
			IDpadre:this.agregar_padres_form.controls['IDpadre'].value
		  };
		  var response;
		  this.service.update_padre(load).subscribe(
			//store response
			data => response = data,
			err => console.log(err),
			()=> {
				if(response && response!=-1){//if not null, undefined,  or error
					for(var i = 0; i<this.padres.length;i++){
						if(this.padres[i].IDpadre == this.agregar_padres_form.controls['IDpadre'].value){
							this.padres[i].nombre = this.agregar_padres_form.controls['nombre'].value;
							this.padres[i].telefono = this.agregar_padres_form.controls['telefono'].value;
							this.padres[i].correo = this.agregar_padres_form.controls['correo'].value;
							this.padres[i].direccion = this.agregar_padres_form.controls['direccion'].value;
						}
					}
					for(var i = 0; i<this.temp_padres.length;i++){
						if(this.temp_padres[i].IDpadre == this.agregar_padres_form.controls['IDpadre'].value){
							this.temp_padres[i].nombre = this.agregar_padres_form.controls['nombre'].value;
							this.temp_padres[i].telefono = this.agregar_padres_form.controls['telefono'].value;
							this.temp_padres[i].correo = this.agregar_padres_form.controls['correo'].value;
							this.temp_padres[i].direccion = this.agregar_padres_form.controls['direccion'].value;
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

	get_padres(){
		var response;
		this.service.get_padres().subscribe(
			//store response
			data => response = data,
			err => console.log(err),
			()=> {
				if(response && response != -1){//if not null
					this.padres = response;
					this.temp_padres = response;
					this.update_offsets();
				}else{
					this.padres = [];
					this.temp_padres = [];
					this.requestOffsetRight = 0;//set as 0
					this.requestOffsetLeft = 0;//set as 0
				}
			   
			}
		);
	}

	update_offsets(){
		if(this.padres.length > 0){
			//Verify if requestOffsetRight overloads requests length
			if(this.padres.length < this.offsetView){
				this.requestOffsetRight = this.padres.length;
			}else{//if not, set to 5
				this.requestOffsetRight = this.offsetView;
			}
			this.requestOffsetLeft = 1;
		}else{
			this.requestOffsetRight = 0;//set as 0
			this.requestOffsetLeft = 0;//set as 0
		}
	}

	set_padre(id){
		this.submit_add = false;
		this.agregar_padres_form.controls['IDpadre'].setValue(this.padres[id].IDpadre);
		this.agregar_padres_form.controls['nombre'].setValue(this.padres[id].nombre);
		this.agregar_padres_form.controls['telefono'].setValue(this.padres[id].telefono);
		this.agregar_padres_form.controls['direccion'].setValue(this.padres[id].direccion);
		this.agregar_padres_form.controls['correo'].setValue(this.padres[id].correo);
		
	}

	search_padre(){
		this.padres = [];
		if(this.search_string.trim().length > 0){
			for(var i = 0; i<this.temp_padres.length;i++){
				if(this.temp_padres[i].nombre.toLowerCase().includes(this.search_string.toLowerCase().trim()) || this.temp_padres[i].telefono.toLowerCase().includes(this.search_string.toLowerCase().trim()) || (this.temp_padres[i].IDpadre+"").toLowerCase().includes(this.search_string.toLowerCase().trim())){
					this.padres.push(this.temp_padres[i]);
				}
			}
			this.update_offsets();
		}else{
			this.padres = this.temp_padres;
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
		this.padres.sort(function(a, b){
			var x = a.nombre.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			var y = b.nombre.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			if (x < y) {return 1;}
			if (x > y) {return -1;}
			return 0;
		});
	}

	sort_nombre_desc(){
		this.padres.sort(function(a, b){
			var x = a.nombre.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			var y = b.nombre.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
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
		this.padres.sort(function(a, b){
			var x = a.IDpadre;
			var y = b.IDpadre;
			if (x < y) {return 1;}
			if (x > y) {return -1;}
			return 0;
		});
	}

	sort_id_desc(){
		this.padres.sort(function(a, b){
			var x = a.IDpadre;
			var y = b.IDpadre;
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
		this.padres.sort(function(a, b){
			var x = a.telefono.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			var y = b.telefono.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			if (x < y) {return 1;}
			if (x > y) {return -1;}
			return 0;
		});
	}

	sort_apellido_desc(){
		this.padres.sort(function(a, b){
			var x = a.telefono.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			var y = b.telefono.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			if (x < y) {return -1;}
			if (x > y) {return 1;}
			return 0;
		});
	}

	updateRequestsGoRight(){
		if(this.padres.length > 0){
			//Verify if requestOffsetRight overloads requests length
			if(this.padres.length< this.requestOffsetRight+this.offsetView){
				this.requestOffsetRight = this.padres.length;
			}else{//if not, set to 5
				this.requestOffsetRight = this.requestOffsetRight + this.offsetView;
			}
			this.requestOffsetLeft = this.requestOffsetLeft + this.offsetView;
		}
	}

	//updateRequestsGoLeft(): Update requests offsets when user clicks left arrow
	updateRequestsGoLeft(){
		if(this.padres.length > 0){
			//check if last element
			if(this.padres.length == this.requestOffsetRight){
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
		  text: "Padre modificado de forma exitosa.",
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
