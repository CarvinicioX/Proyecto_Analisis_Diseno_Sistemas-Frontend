import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { AdminMaestrosService } from '../admin_maestros.service';

@Component({
  selector: 'eliminar_maestros',
  templateUrl: 'eliminar_maestros.template.html'
})


export class EliminarMaestrosComponent implements OnInit{

	private maestros:any;
	private order:string;
    private ascendent:boolean;
    private requestOffsetRight:number;//requestTable offset to control request browsing
    private requestOffsetLeft:number;//requestTable offset to control request browsing
    private offsetView:number;
    private temp_maestros:any;
    private search_string:string;
    private maestro_nombre:string;
    private maestro_telefono:string;
    private maestro_id:number;
    private maestro_departamento:string;
    private maestro_nacimiento:string;

	constructor(private router:Router, private service:AdminMaestrosService){
		this.order = "";
        this.ascendent = false;
        this.requestOffsetRight = 0;//set as 0
        this.requestOffsetLeft = 0;//set as 0
        this.offsetView = 5;
		this.maestros = [];
		this.temp_maestros = [];
		this.search_string = "";
		this.maestro_nombre = "";
    	this.maestro_telefono = "";
    	this.maestro_nacimiento = "";
    	this.maestro_departamento = "";
    	this.maestro_id = null;
	}

	ngOnInit() {
		this.get_maestros();
		
    }

    eliminar_maestro(){
    	var load = {IDmaestro:this.maestro_id};
    	var response;
        this.service.delete_maestro(load).subscribe(
            //store response
            data => response = data,
            err => console.log(err),
            ()=> {
                if(response && response != -1){//if not null
                	for(var i = 0; i<this.maestros.length;i++){
			    		if(this.maestros[i].IDmaestro == this.maestro_id){
			    			this.maestros.splice(i,1);
			    		}
			    	}
			    	for(var i = 0; i<this.temp_maestros.length;i++){
			    		if(this.temp_maestros[i].IDmaestro == this.maestro_id){
			    			this.temp_maestros.splice(i,1);
			    		}
			    	}
			    	this.update_offsets();
			    	this.maestro_nombre = "";
			    	this.maestro_telefono = "";
			    	this.maestro_nacimiento = "";
			    	this.maestro_departamento = "";
			    	this.maestro_id = null;
			    	this.eliminar_success();
                }else{
                	this.internalServerError();
                }
               
            }
        );
    	

    	

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
    	this.maestro_nombre = this.maestros[id].nombre;
    	this.maestro_telefono = this.maestros[id].telefono;
    	this.maestro_departamento = this.maestros[id].direccion;
    	this.maestro_nacimiento = this.maestros[id].birth_date.substring(0,10);
    	this.maestro_id = this.maestros[id].IDmaestro;
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
            var x = a.nombre.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
            var y = b.nombre.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
            if (x < y) {return 1;}
            if (x > y) {return -1;}
            return 0;
        });
    }

    sort_nombre_desc(){
        this.maestros.sort(function(a, b){
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

    eliminar_success() {
      swal({
          title: "Eliminado Exitosamente",
          text: "maestro eliminado de forma exitosa.",
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