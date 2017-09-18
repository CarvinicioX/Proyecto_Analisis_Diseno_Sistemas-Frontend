import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { AdminGradosService } from '../admin_grados.service';

@Component({
  selector: 'eliminar_grados',
  templateUrl: 'eliminar_grados.template.html'
})


export class EliminarGradosComponent implements OnInit{

	private grados:any;
	private order:string;
    private ascendent:boolean;
    private requestOffsetRight:number;//requestTable offset to control request browsing
    private requestOffsetLeft:number;//requestTable offset to control request browsing
    private offsetView:number;
    private temp_grados:any;
    private search_string:string;
    private grado:string;
    private IDgrado:number;

	constructor(private router:Router, private service:AdminGradosService){
		this.order = "";
        this.ascendent = false;
        this.requestOffsetRight = 0;//set as 0
        this.requestOffsetLeft = 0;//set as 0
        this.offsetView = 5;
		this.grados = [];
		this.temp_grados = [];
		this.search_string = "";
		this.grado = "";
    	this.IDgrado = null;
	}

	ngOnInit() {
		this.get_grados();
		
    }

    eliminar_grado(){
    	var load = {IDgrado:this.IDgrado};
    	var response;
        this.service.delete_grado(load).subscribe(
            //store response
            data => response = data,
            err => console.log(err),
            ()=> {
                if(response && response != -1){//if not null
                	for(var i = 0; i<this.grados.length;i++){
			    		if(this.grados[i].IDgrado == this.IDgrado){
			    			this.grados.splice(i,1);
			    		}
			    	}
			    	for(var i = 0; i<this.temp_grados.length;i++){
			    		if(this.temp_grados[i].IDgrado == this.IDgrado){
			    			this.temp_grados.splice(i,1);
			    		}
			    	}
			    	this.update_offsets();
			    	this.grado = "";
			    	this.IDgrado = null;
			    	this.eliminar_success();
                }else{
                	this.internalServerError();
                }
               
            }
        );
    	

    	

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
        this.grado = this.grados[id].grado;
        console.log(this.grado);
        this.IDgrado = this.grados[id].IDgrado;
        console.log(this.IDgrado);
    }

    search_grado(){
    	this.grados = [];
    	if(this.search_string.trim().length > 0){
    		for(var i = 0; i<this.temp_grados.length;i++){
	    		if(this.temp_grados[i].grados.toLowerCase().includes(this.search_string.toLowerCase().trim()) || this.temp_grados[i].apellidos.toLowerCase().includes(this.search_string.toLowerCase().trim()) || (this.temp_grados[i].IDgrado+"").toLowerCase().includes(this.search_string.toLowerCase().trim())){
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
            var x = a.IDgrado;
            var y = b.IDgrado;
            if (x < y) {return 1;}
            if (x > y) {return -1;}
            return 0;
        });
    }

    sort_id_desc(){
        this.grados.sort(function(a, b){
            var x = a.IDgrado;
            var y = b.IDgrado;
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

    eliminar_success() {
      swal({
          title: "Eliminado Exitosamente",
          text: "Grado eliminado de forma exitosa.",
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