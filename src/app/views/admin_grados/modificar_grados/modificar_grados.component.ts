import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { AdminGradosService } from '../admin_grados.service';

@Component({
  selector: 'modificar_grados',
  templateUrl: 'modificar_grados.template.html'
})


export class ModificarGradosComponent implements OnInit{

	private grados:any;
	private order:string;
    private ascendent:boolean;
    private requestOffsetRight:number;//requestTable offset to control request browsing
    private requestOffsetLeft:number;//requestTable offset to control request browsing
    private offsetView:number;
    private temp_grados:any;
    private search_string:string;
    private agregar_grados_form:FormGroup;
    private submit_add:boolean;

	constructor(form_builder: FormBuilder, private router:Router, private service:AdminGradosService){
        this.submit_add = false;
            this.agregar_grados_form = form_builder.group({
            'grado' : ["", Validators.required],
            'IDgrado':["", Validators.required]
        })
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

    modificar_grado(){
        if(this.agregar_grados_form.valid){
          this.submit_add = true;
          var load = {
            grado:this.agregar_grados_form.controls['grado'].value, 
            IDgrado:this.agregar_grados_form.controls['IDgrado'].value
          };
          var response;
          this.service.update_grado(load).subscribe(
            //store response
            data => response = data,
            err => console.log(err),
            ()=> {
                if(response && response!=-1){//if not null, undefined,  or error
                    for(var i = 0; i<this.grados.length;i++){
                        if(this.grados[i].IDgrado == this.agregar_grados_form.controls['IDgrado'].value){
                            this.grados[i].grado = this.agregar_grados_form.controls['grado'].value;
                        }
                    }
                    for(var i = 0; i<this.temp_grados.length;i++){
                        if(this.temp_grados[i].IDgrado == this.agregar_grados_form.controls['IDgrado'].value){
                            this.temp_grados[i].grado = this.agregar_grados_form.controls['grado'].value;
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
        this.submit_add = false;
        this.agregar_grados_form.controls['IDgrado'].setValue(this.grados[id].IDgrado);
    	this.agregar_grados_form.controls['grado'].setValue(this.grados[id].grado);
    	
    }

    search_grado(){
    	this.grados = [];
    	if(this.search_string.trim().length > 0){
    		for(var i = 0; i<this.temp_grados.length;i++){
	    		if(this.temp_grados[i].grado.toLowerCase().includes(this.search_string.toLowerCase().trim()) || (this.temp_grados[i].IDgrado+"").toLowerCase().includes(this.search_string.toLowerCase().trim())){
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
        if(this.grados == "grado" && this.ascendent == false){
            this.ascendent = true;
            this.sort_grado_asc();
        }else if(this.grados == "grado" && this.ascendent == true){
            this.ascendent = false;
            this.sort_grado_desc();
        }else{
            this.grados = "grado";
            this.ascendent = false;
            this.sort_grado_desc();
        }

    }

    sort_grado_asc(){
        this.grados.sort(function(a, b){
            var x = a.grado.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
            var y = b.grado.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
            if (x < y) {return 1;}
            if (x > y) {return -1;}
            return 0;
        });
    }

    sort_grado_desc(){
        this.grados.sort(function(a, b){
            var x = a.grado.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
            var y = b.grado.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
    }

    sort_id(){
        if(this.grados == "id" && this.ascendent == false){
            this.ascendent = true;
            this.sort_id_asc();
        }else if(this.grados == "id" && this.ascendent == true){
            this.ascendent = false;
            this.sort_id_desc();
        }else{
            this.grados = "id";
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

    modificar_success() {
      swal({
          title: "Modificado Exitosamente",
          text: "Grado modificado de forma exitosa.",
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