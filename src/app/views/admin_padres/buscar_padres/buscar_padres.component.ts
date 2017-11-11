import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { AdminPadresService } from '../admin_padres.service';

@Component({
  selector: 'buscar_padres',
  templateUrl: 'buscar_padres.template.html'
})


export class BuscarPadresComponent implements OnInit{
	public padres:any;
	public order:string;
	public ascendent:boolean;
	public requestOffsetRight:number;//requestTable offset to control request browsing
	public requestOffsetLeft:number;//requestTable offset to control request browsing
	public offsetView:number;
	public temp_padres:any;
	public search_string:string;
	public padre_nombre:string;
	public padre_telefono:string;
	public IDpadre:number;
	public padre_direccion:string;
	public padre_correo:string;

	constructor(private router:Router, private service:AdminPadresService){
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
		this.padre_nombre = this.padres[id].nombre;
		this.padre_telefono = this.padres[id].telefono;
		this.padre_direccion = this.padres[id].direccion;
		this.padre_correo = this.padres[id].correo;
		this.IDpadre = this.padres[id].IDpadre;
	}

	search_padre(){
		this.padres = [];
		if(this.search_string.trim().length > 0){
			for(var i = 0; i<this.temp_padres.length;i++){
				if(this.temp_padres[i].nombre.toLowerCase().includes(this.search_string.toLowerCase().trim()) || this.temp_padres[i].telefonos.toLowerCase().includes(this.search_string.toLowerCase().trim()) || (this.temp_padres[i].IDpadre+"").toLowerCase().includes(this.search_string.toLowerCase().trim())){
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
		this.padres.sort(function(a, b){
			var x = a.telefonos.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			var y = b.telefonos.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			if (x < y) {return 1;}
			if (x > y) {return -1;}
			return 0;
		});
	}

	sort_telefono_desc(){
		this.padres.sort(function(a, b){
			var x = a.telefonos.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			var y = b.telefonos.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
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
}
