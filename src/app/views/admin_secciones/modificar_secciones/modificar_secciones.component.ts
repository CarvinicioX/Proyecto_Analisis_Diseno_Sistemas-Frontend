import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { AdminSeccionesService } from '../admin_secciones.service';

@Component({
  selector: 'modificar_secciones',
  templateUrl: 'modificar_secciones.template.html'
})


export class ModificarSeccionesComponent implements OnInit{

	public secciones:any;
	public order:string;
	public ascendent:boolean;
	public requestOffsetRight:number;//requestTable offset to control request browsing
	public requestOffsetLeft:number;//requestTable offset to control request browsing
	public offsetView:number;
	public temp_secciones:any;
	public search_string:string;
	public agregar_secciones_form:FormGroup;
	public submit_add:boolean;

	constructor(form_builder: FormBuilder, private router:Router, private service:AdminSeccionesService){
		this.submit_add = false;
			this.agregar_secciones_form = form_builder.group({
			'IDgrado' : ["", Validators.required],
			'IDmaestro' : ["", Validators.required],
			'IDclase' : ["", Validators.required],
			'anio' : ["", Validators.required],
			'IDseccion':["", Validators.required]
		})
		this.order = "";
		this.ascendent = false;
		this.requestOffsetRight = 0;//set as 0
		this.requestOffsetLeft = 0;//set as 0
		this.offsetView = 5;
		this.secciones = [];
		this.temp_secciones = [];
		this.search_string = "";
	}

	ngOnInit() {
		this.get_secciones();
	}

	modificar_seccion(){
		if(this.agregar_secciones_form.valid){
		  this.submit_add = true;
		  var IDclase_temp = new Date(this.agregar_secciones_form.controls['IDclase'].value);
		  var date_string = IDclase_temp.toISOString().slice(0, 10).replace('T', ' ');
		  var load = {
			IDgrado:this.agregar_secciones_form.controls['IDgrado'].value, 
			IDmaestro:this.agregar_secciones_form.controls['IDmaestro'].value, 
			IDclase: date_string,
			anio: this.agregar_secciones_form.controls['anio'].value,
			IDseccion:this.agregar_secciones_form.controls['IDseccion'].value
		  };
		  var response;
		  this.service.update_seccion(load).subscribe(
			//store response
			data => response = data,
			err => console.log(err),
			()=> {
				if(response && response!=-1){//if not null, undefined,  or error
					for(var i = 0; i<this.secciones.length;i++){
						if(this.secciones[i].IDseccion == this.agregar_secciones_form.controls['IDseccion'].value){
							this.secciones[i].IDgrado = this.agregar_secciones_form.controls['IDgrado'].value;
							this.secciones[i].IDmaestro = this.agregar_secciones_form.controls['IDmaestro'].value;
							this.secciones[i].IDclase = this.agregar_secciones_form.controls['IDclase'].value;
							this.secciones[i].anio = this.agregar_secciones_form.controls['anio'].value;
						}
					}
					for(var i = 0; i<this.temp_secciones.length;i++){
						if(this.temp_secciones[i].IDseccion == this.agregar_secciones_form.controls['IDseccion'].value){
							this.temp_secciones[i].IDgrado = this.agregar_secciones_form.controls['IDgrado'].value;
							this.temp_secciones[i].IDmaestro = this.agregar_secciones_form.controls['IDmaestro'].value;
							this.temp_secciones[i].IDclase = this.agregar_secciones_form.controls['IDclase'].value;
							this.temp_secciones[i].anio = this.agregar_secciones_form.controls['anio'].value;
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

	get_secciones(){
		var response;
		this.service.get_secciones().subscribe(
			//store response
			data => response = data,
			err => console.log(err),
			()=> {
				if(response && response != -1){//if not null
					this.secciones = response;
					this.temp_secciones = response;
					this.update_offsets();
				}else{
					this.secciones = [];
					this.temp_secciones = [];
					this.requestOffsetRight = 0;//set as 0
					this.requestOffsetLeft = 0;//set as 0
				}
			   
			}
		);
	}

	update_offsets(){
		if(this.secciones.length > 0){
			//Verify if requestOffsetRight overloads requests length
			if(this.secciones.length < this.offsetView){
				this.requestOffsetRight = this.secciones.length;
			}else{//if not, set to 5
				this.requestOffsetRight = this.offsetView;
			}
			this.requestOffsetLeft = 1;
		}else{
			this.requestOffsetRight = 0;//set as 0
			this.requestOffsetLeft = 0;//set as 0
		}
	}

	set_seccion(id){
		this.submit_add = false;
		this.agregar_secciones_form.controls['IDseccion'].setValue(this.secciones[id].IDseccion);
		this.agregar_secciones_form.controls['IDgrado'].setValue(this.secciones[id].IDgrado);
		this.agregar_secciones_form.controls['IDmaestro'].setValue(this.secciones[id].IDmaestro);
		this.agregar_secciones_form.controls['anio'].setValue(this.secciones[id].anio);
		this.agregar_secciones_form.controls['IDclase'].setValue(this.secciones[id].IDclase);
		
	}

	search_seccion(){
		this.secciones = [];
		if(this.search_string.trim().length > 0){
			for(var i = 0; i<this.temp_secciones.length;i++){
				if(this.temp_secciones[i].IDgrado.toLowerCase().includes(this.search_string.toLowerCase().trim()) || this.temp_secciones[i].IDmaestro.toLowerCase().includes(this.search_string.toLowerCase().trim()) || (this.temp_secciones[i].IDseccion+"").toLowerCase().includes(this.search_string.toLowerCase().trim())){
					this.secciones.push(this.temp_secciones[i]);
				}
			}
			this.update_offsets();
		}else{
			this.secciones = this.temp_secciones;
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
		this.secciones.sort(function(a, b){
			var x = a.IDgrado.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			var y = b.IDgrado.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			if (x < y) {return 1;}
			if (x > y) {return -1;}
			return 0;
		});
	}

	sort_nombre_desc(){
		this.secciones.sort(function(a, b){
			var x = a.IDgrado.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			var y = b.IDgrado.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
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
		this.secciones.sort(function(a, b){
			var x = a.IDseccion;
			var y = b.IDseccion;
			if (x < y) {return 1;}
			if (x > y) {return -1;}
			return 0;
		});
	}

	sort_id_desc(){
		this.secciones.sort(function(a, b){
			var x = a.IDseccion;
			var y = b.IDseccion;
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
		this.secciones.sort(function(a, b){
			var x = a.IDmaestro.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			var y = b.IDmaestro.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			if (x < y) {return 1;}
			if (x > y) {return -1;}
			return 0;
		});
	}

	sort_apellido_desc(){
		this.secciones.sort(function(a, b){
			var x = a.IDmaestro.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			var y = b.IDmaestro.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			if (x < y) {return -1;}
			if (x > y) {return 1;}
			return 0;
		});
	}

	updateRequestsGoRight(){
		if(this.secciones.length > 0){
			//Verify if requestOffsetRight overloads requests length
			if(this.secciones.length< this.requestOffsetRight+this.offsetView){
				this.requestOffsetRight = this.secciones.length;
			}else{//if not, set to 5
				this.requestOffsetRight = this.requestOffsetRight + this.offsetView;
			}
			this.requestOffsetLeft = this.requestOffsetLeft + this.offsetView;
		}
	}

	//updateRequestsGoLeft(): Update requests offsets when user clicks left arrow
	updateRequestsGoLeft(){
		if(this.secciones.length > 0){
			//check if last element
			if(this.secciones.length == this.requestOffsetRight){
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
		  text: "Seccion modificado de forma exitosa.",
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
