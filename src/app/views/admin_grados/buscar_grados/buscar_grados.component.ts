import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { AdminGradosService } from '../admin_grados.service';

@Component({
  selector: 'buscar_grados',
  templateUrl: 'buscar_grados.template.html'
})


export class BuscarGradosComponent implements OnInit{
	public grados:any;
	public order:string;
	public ascendent:boolean;
	public requestOffsetRight:number;//requestTable offset to control request browsing
	public requestOffsetLeft:number;//requestTable offset to control request browsing
	public offsetView:number;
	public temp_grados:any;
	public search_string:string;
	public grado_grado:string;
	public grado_id:number;

	constructor(private router:Router, private service:AdminGradosService){
		this.order = "";
		this.ascendent = false;
		this.requestOffsetRight = 0;//set as 0
		this.requestOffsetLeft = 0;//set as 0
		this.offsetView = 5;
		this.grados = [];
		this.temp_grados = [];
		this.search_string = "";
	}

	ngOnInit() {
		this.get_grados();
		
	}

	get_grados(){
		var response;
		this.service.get_grados().subscribe(
			//store response
			data => response = data,
			err => console.log(err),
			()=> {
				if(response && response != -1){//if not null
					this.grados = response;
					console.log(this.grados);
					this.temp_grados = response;
					this.update_offsets();
				}else{
					this.grados = [];
					this.temp_grados = [];
					this.requestOffsetRight = 0;//set as 0
					this.requestOffsetLeft = 0;//set as 0
				}
			   
			}
		);
	}

	update_offsets(){
		if(this.grados.length > 0){
			//Verify if requestOffsetRight overloads requests length
			if(this.grados.length < this.offsetView){
				this.requestOffsetRight = this.grados.length;
			}else{//if not, set to 5
				this.requestOffsetRight = this.offsetView;
			}
			this.requestOffsetLeft = 1;
		}else{
			this.requestOffsetRight = 0;//set as 0
			this.requestOffsetLeft = 0;//set as 0
		}
	}

	set_grado(id){
		this.grado_grado = this.grados[id].grados;
		this.grado_id = this.grados[id].grado_id;
	}

	search_grado(){
		this.grados = [];
		if(this.search_string.trim().length > 0){
			for(var i = 0; i<this.temp_grados.length;i++){
				if(this.temp_grados[i].grados.toLowerCase().includes(this.search_string.toLowerCase().trim()) || this.temp_grados[i].apellidos.toLowerCase().includes(this.search_string.toLowerCase().trim()) || (this.temp_grados[i].grado_id+"").toLowerCase().includes(this.search_string.toLowerCase().trim())){
					this.grados.push(this.temp_grados[i]);
				}
			}
			this.update_offsets();
		}else{
			this.grados = this.temp_grados;
			this.update_offsets();
		}
		
	}

	sort_grado(){
		if(this.order == "grado" && this.ascendent == false){
			this.ascendent = true;
			this.sort_grado_asc();
		}else if(this.order == "grado" && this.ascendent == true){
			this.ascendent = false;
			this.sort_grado_desc();
		}else{
			this.order = "grado";
			this.ascendent = false;
			this.sort_grado_desc();
		}

	}

	sort_grado_asc(){
		this.grados.sort(function(a, b){
			var x = a.grados.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			var y = b.grados.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			if (x < y) {return 1;}
			if (x > y) {return -1;}
			return 0;
		});
	}

	sort_grado_desc(){
		this.grados.sort(function(a, b){
			var x = a.grados.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
			var y = b.grados.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
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
		this.grados.sort(function(a, b){
			var x = a.grado_id;
			var y = b.grado_id;
			if (x < y) {return 1;}
			if (x > y) {return -1;}
			return 0;
		});
	}

	sort_id_desc(){
		this.grados.sort(function(a, b){
			var x = a.grado_id;
			var y = b.grado_id;
			if (x < y) {return -1;}
			if (x > y) {return 1;}
			return 0;
		});
	}

	updateRequestsGoRight(){
		if(this.grados.length > 0){
			//Verify if requestOffsetRight overloads requests length
			if(this.grados.length< this.requestOffsetRight+this.offsetView){
				this.requestOffsetRight = this.grados.length;
			}else{//if not, set to 5
				this.requestOffsetRight = this.requestOffsetRight + this.offsetView;
			}
			this.requestOffsetLeft = this.requestOffsetLeft + this.offsetView;
		}
	}

	//updateRequestsGoLeft(): Update requests offsets when user clicks left arrow
	updateRequestsGoLeft(){
		if(this.grados.length > 0){
			//check if last element
			if(this.grados.length == this.requestOffsetRight){
				this.requestOffsetLeft = this.requestOffsetLeft - this.offsetView;
				this.requestOffsetRight = this.requestOffsetLeft + this.offsetView - 1;
			}else{//if not last element
				this.requestOffsetLeft = this.requestOffsetLeft - this.offsetView;
				this.requestOffsetRight = this.requestOffsetRight - this.offsetView;
			}
		}
	}
}