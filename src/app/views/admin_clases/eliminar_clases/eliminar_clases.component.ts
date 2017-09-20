import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { AdminClasesService } from '../admin_clases.service';

@Component({
  selector: 'eliminar_clases',
  templateUrl: 'eliminar_clases.template.html'
})


export class EliminarClasesComponent implements OnInit{

	private clases:any;
	private order:string;
    private ascendent:boolean;
    private requestOffsetRight:number;//requestTable offset to control request browsing
    private requestOffsetLeft:number;//requestTable offset to control request browsing
    private offsetView:number;
    private temp_clases:any;
    private search_string:string;
    private clase_nombre:string;
   
    private clase_id:number;
   

	constructor(private router:Router, private service:AdminClasesService){
		this.order = "";
        this.ascendent = false;
        this.requestOffsetRight = 0;//set as 0
        this.requestOffsetLeft = 0;//set as 0
        this.offsetView = 5;
		this.clases = [];
		this.temp_clases = [];
		this.search_string = "";
		this.clase_nombre = "";
    	this.clase_id = null;
	}

	ngOnInit() {
		this.get_clases();
		
    }

    eliminar_clase(){
    	var load = {IDclase:this.clase_id};
    	var response;
        this.service.delete_clase(load).subscribe(
            //store response
            data => response = data,
            err => console.log(err),
            ()=> {
                if(response && response != -1){//if not null
                	for(var i = 0; i<this.clases.length;i++){
			    		if(this.clases[i].IDclase == this.clase_id){
			    			this.clases.splice(i,1);
			    		}
			    	}
			    	for(var i = 0; i<this.temp_clases.length;i++){
			    		if(this.temp_clases[i].IDclase == this.clase_id){
			    			this.temp_clases.splice(i,1);
			    		}
			    	}
			    	this.update_offsets();
			    	this.clase_nombre = "";
			    	this.clase_id = null;
			    	this.eliminar_success();
                }else{
                	this.internalServerError();
                }
               
            }
        );
    	

    	

    }

    get_clases(){
        var response;
        this.service.get_clases().subscribe(
            //store response
            data => response = data,
            err => console.log(err),
            ()=> {
                if(response && response != -1){//if not null
                    this.clases = response;
                    this.temp_clases = response;
                    this.update_offsets();
                }else{
                    this.clases = [];
                    this.temp_clases = [];
                    this.requestOffsetRight = 0;//set as 0
        			this.requestOffsetLeft = 0;//set as 0
                }
               
            }
        );
    }

    update_offsets(){
    	if(this.clases.length > 0){
            //Verify if requestOffsetRight overloads requests length
            if(this.clases.length < this.offsetView){
                this.requestOffsetRight = this.clases.length;
            }else{//if not, set to 5
                this.requestOffsetRight = this.offsetView;
            }
            this.requestOffsetLeft = 1;
        }else{
        	this.requestOffsetRight = 0;//set as 0
			this.requestOffsetLeft = 0;//set as 0
        }
    }

    set_clase(id){
    	this.clase_nombre = this.clases[id].nombre;
    	
    	this.clase_id = this.clases[id].IDclase;
    }

    search_clase(){
    	this.clases = [];
    	if(this.search_string.trim().length > 0){
    		for(var i = 0; i<this.temp_clases.length;i++){
	    		if(this.temp_clases[i].nombre.toLowerCase().includes(this.search_string.toLowerCase().trim())  || (this.temp_clases[i].IDclase+"").toLowerCase().includes(this.search_string.toLowerCase().trim())){
	    			this.clases.push(this.temp_clases[i]);
	    		}
	    	}
	    	this.update_offsets();
    	}else{
    		this.clases = this.temp_clases;
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
        this.clases.sort(function(a, b){
            var x = a.nombres.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
            var y = b.nombres.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
            if (x < y) {return 1;}
            if (x > y) {return -1;}
            return 0;
        });
    }

    sort_nombre_desc(){
        this.clases.sort(function(a, b){
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
        this.clases.sort(function(a, b){
            var x = a.clase_id;
            var y = b.clase_id;
            if (x < y) {return 1;}
            if (x > y) {return -1;}
            return 0;
        });
    }

    sort_id_desc(){
        this.clases.sort(function(a, b){
            var x = a.clase_id;
            var y = b.clase_id;
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
    }

   

    updateRequestsGoRight(){
        if(this.clases.length > 0){
            //Verify if requestOffsetRight overloads requests length
            if(this.clases.length< this.requestOffsetRight+this.offsetView){
                this.requestOffsetRight = this.clases.length;
            }else{//if not, set to 5
                this.requestOffsetRight = this.requestOffsetRight + this.offsetView;
            }
            this.requestOffsetLeft = this.requestOffsetLeft + this.offsetView;
        }
    }

    //updateRequestsGoLeft(): Update requests offsets when user clicks left arrow
    updateRequestsGoLeft(){
        if(this.clases.length > 0){
            //check if last element
            if(this.clases.length == this.requestOffsetRight){
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
          text: "clase eliminado de forma exitosa.",
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