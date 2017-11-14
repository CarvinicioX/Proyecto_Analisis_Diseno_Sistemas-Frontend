import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { SeccionesMaestroService } from './secciones_maestro.service';

@Component({
  selector: 'secciones_maestro',
  templateUrl: 'secciones_maestro.template.html'
})


export class SeccionesMaestroComponent implements OnInit{
	public secciones:any;
	public order:string;
	public ascendent:boolean;
	public requestOffsetRight:number;//requestTable offset to control request browsing
	public requestOffsetLeft:number;//requestTable offset to control request browsing
	public offsetView:number;
	public temp_secciones:any;
	public search_string:string;
	public seccion_nombre:string;
	public seccion_apellido:string;
	public IDseccion:number;
	public seccion_anio:string;
	public seccion_IDclase:string;
	public seccionest:any;
	public codigo:any;
	

	constructor(private router:Router, private service:SeccionesMaestroService){
		this.order = "";
		this.ascendent = false;
		this.requestOffsetRight = 0;//set as 0
		this.requestOffsetLeft = 0;//set as 0
		this.offsetView = 5;
		this.secciones = [];
		this.seccionest=[];
		this.temp_secciones = [];
		this.search_string = "";
		this.codigo;
		
	}

	ngOnInit() {
		this.get_secciones();
		this.getid();
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
					let i;
					for(i=0;i<this.secciones.length;i++){
						
						if(this.secciones[i].IDmaestro==this.codigo){
							this.seccionest.push(this.secciones[i]);
							
						}
					}
					this.update_offsets();
					
					console.log(this.seccionest);
					
				}else{
					this.secciones = [];
					this.temp_secciones = [];
					this.requestOffsetRight = 0;//set as 0
					this.requestOffsetLeft = 0;//set as 0
				}
			   
			}
		)
		
	}
	getid(){
		
		var c=sessionStorage.getItem('userInfo');
		let js=[];
		console.log('sssssssssssssssssssssssssssssssssssssssssssssss');
		console.log(c);
		console.log('sssssssssssssssssssssssssssssssssssssssssssssss');
		//js=JSON.stringify(c);
		
		
		this.codigo=c.substring(30,40);
	
	//	console.log(sessionStorage);
		console.log(this.codigo);

	}
//	setsecciones(){
	//	let i;
	//	for(i=0;i<this.secciones.length;i++){
			
	//		if(this.secciones[i].IDmaestro==this.id){
	//			this.seccionest.push(this.secciones[i]);
				
	//		}
	//	}
	//	console.log(this.seccionest);
	//}

	update_offsets(){
		if(this.seccionest.length > 0){
			//Verify if requestOffsetRight overloads requests length
			if(this.seccionest.length < this.offsetView){
				this.requestOffsetRight = this.seccionest.length;
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
		this.seccion_nombre = this.seccionest[id].IDgrado;
		this.seccion_apellido = this.seccionest[id].IDmaestro;
		this.seccion_anio = this.seccionest[id].anio;
		this.seccion_IDclase = this.seccionest[id].IDclase;
		this.IDseccion = this.seccionest[id].IDseccion;
	}

	search_seccion(){
		this.seccionest = [];
		if(this.search_string.trim().length > 0){
			for(var i = 0; i<this.temp_secciones.length;i++){
				if(this.temp_secciones[i].IDgrado.toLowerCase().includes(this.search_string.toLowerCase().trim()) || this.temp_secciones[i].IDmaestros.toLowerCase().includes(this.search_string.toLowerCase().trim()) || (this.temp_secciones[i].IDseccion+"").toLowerCase().includes(this.search_string.toLowerCase().trim())){
					this.seccionest.push(this.temp_secciones[i]);
				}
			}
			this.update_offsets();
		}else{
			this.seccionest = this.temp_secciones;
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
		this.seccionest.sort(function(a, b){
			var x = a.IDgrado.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			var y = b.IDgrado.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			if (x < y) {return 1;}
			if (x > y) {return -1;}
			return 0;
		});
	}

	sort_nombre_desc(){
		this.seccionest.sort(function(a, b){
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
		this.seccionest.sort(function(a, b){
			var x = a.IDseccion;
			var y = b.IDseccion;
			if (x < y) {return 1;}
			if (x > y) {return -1;}
			return 0;
		});
	}

	sort_id_desc(){
		this.seccionest.sort(function(a, b){
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
		this.seccionest.sort(function(a, b){
			var x = a.IDmaestros.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			var y = b.IDmaestros.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			if (x < y) {return 1;}
			if (x > y) {return -1;}
			return 0;
		});
	}

	sort_apellido_desc(){
		this.seccionest.sort(function(a, b){
			var x = a.IDmaestros.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			var y = b.IDmaestros.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			if (x < y) {return -1;}
			if (x > y) {return 1;}
			return 0;
		});
	}

	updateRequestsGoRight(){
		if(this.seccionest.length > 0){
			//Verify if requestOffsetRight overloads requests length
			if(this.seccionest.length< this.requestOffsetRight+this.offsetView){
				this.requestOffsetRight = this.seccionest.length;
			}else{//if not, set to 5
				this.requestOffsetRight = this.requestOffsetRight + this.offsetView;
			}
			this.requestOffsetLeft = this.requestOffsetLeft + this.offsetView;
		}
	}

	//updateRequestsGoLeft(): Update requests offsets when user clicks left arrow
	updateRequestsGoLeft(){
		if(this.seccionest.length > 0){
			//check if last element
			if(this.seccionest.length == this.requestOffsetRight){
				this.requestOffsetLeft = this.requestOffsetLeft - this.offsetView;
				this.requestOffsetRight = this.requestOffsetLeft + this.offsetView - 1;
			}else{//if not last element
				this.requestOffsetLeft = this.requestOffsetLeft - this.offsetView;
				this.requestOffsetRight = this.requestOffsetRight - this.offsetView;
			}
		}
	}
}
