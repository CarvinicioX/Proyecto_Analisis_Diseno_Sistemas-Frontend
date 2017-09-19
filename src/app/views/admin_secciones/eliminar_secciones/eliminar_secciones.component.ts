import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { AdminSeccionesService } from '../admin_secciones.service';

@Component({
  selector: 'eliminar_secciones',
  templateUrl: 'eliminar_secciones.template.html'
})


export class EliminarSeccionesComponent implements OnInit{

	private secciones:any;
	private order:string;
    private ascendent:boolean;
    private requestOffsetRight:number;//requestTable offset to control request browsing
    private requestOffsetLeft:number;//requestTable offset to control request browsing
    private offsetView:number;
    private temp_secciones:any;
    private search_string:string;
    private seccion_nombre:string;
    private seccion_apellido:string;
    private seccion_id:number;
    private seccion_departamento:string;
    private seccion_nacimiento:string;

	constructor(private router:Router, private service:AdminSeccionesService){
		this.order = "";
        this.ascendent = false;
        this.requestOffsetRight = 0;//set as 0
        this.requestOffsetLeft = 0;//set as 0
        this.offsetView = 5;
		this.secciones = [];
		this.temp_secciones = [];
		this.search_string = "";
		this.seccion_nombre = "";
    	this.seccion_apellido = "";
    	this.seccion_nacimiento = "";
    	this.seccion_departamento = "";
    	this.seccion_id = null;
	}

	ngOnInit() {
		this.get_secciones();
		
    }

    eliminar_seccion(){
    	var load = {seccion_id:this.seccion_id};
    	var response;
        this.service.delete_seccion(load).subscribe(
            //store response
            data => response = data,
            err => console.log(err),
            ()=> {
                if(response && response != -1){//if not null
                	for(var i = 0; i<this.secciones.length;i++){
			    		if(this.secciones[i].seccion_id == this.seccion_id){
			    			this.secciones.splice(i,1);
			    		}
			    	}
			    	for(var i = 0; i<this.temp_secciones.length;i++){
			    		if(this.temp_secciones[i].seccion_id == this.seccion_id){
			    			this.temp_secciones.splice(i,1);
			    		}
			    	}
			    	this.update_offsets();
			    	this.seccion_nombre = "";
			    	this.seccion_apellido = "";
			    	this.seccion_nacimiento = "";
			    	this.seccion_departamento = "";
			    	this.seccion_id = null;
			    	this.eliminar_success();
                }else{
                	this.internalServerError();
                }
               
            }
        );
    	

    	

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
    	this.seccion_nombre = this.secciones[id].nombres;
    	this.seccion_apellido = this.secciones[id].apellidos;
    	this.seccion_departamento = this.secciones[id].departamento;
    	this.seccion_nacimiento = this.secciones[id].nacimiento.substring(0,10);
    	this.seccion_id = this.secciones[id].seccion_id;
    }

    search_seccion(){
    	this.secciones = [];
    	if(this.search_string.trim().length > 0){
    		for(var i = 0; i<this.temp_secciones.length;i++){
	    		if(this.temp_secciones[i].nombres.toLowerCase().includes(this.search_string.toLowerCase().trim()) || this.temp_secciones[i].apellidos.toLowerCase().includes(this.search_string.toLowerCase().trim()) || (this.temp_secciones[i].seccion_id+"").toLowerCase().includes(this.search_string.toLowerCase().trim())){
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
            var x = a.nombres.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
            var y = b.nombres.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
            if (x < y) {return 1;}
            if (x > y) {return -1;}
            return 0;
        });
    }

    sort_nombre_desc(){
        this.secciones.sort(function(a, b){
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
        this.secciones.sort(function(a, b){
            var x = a.seccion_id;
            var y = b.seccion_id;
            if (x < y) {return 1;}
            if (x > y) {return -1;}
            return 0;
        });
    }

    sort_id_desc(){
        this.secciones.sort(function(a, b){
            var x = a.seccion_id;
            var y = b.seccion_id;
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
            var x = a.apellidos.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
            var y = b.apellidos.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
            if (x < y) {return 1;}
            if (x > y) {return -1;}
            return 0;
        });
    }

    sort_apellido_desc(){
        this.secciones.sort(function(a, b){
            var x = a.apellidos.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
            var y = b.apellidos.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
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

    eliminar_success() {
      swal({
          title: "Eliminado Exitosamente",
          text: "Seccion eliminado de forma exitosa.",
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
