import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { AdminSeccionesService } from '../admin_secciones.service';
import { AdminMaestrosService } from './../../admin_maestros/admin_maestros.service';
import { AdminGradosService } from './../../admin_grados/admin_grados.service';
import { AdminClasesService } from './../../admin_clases/admin_clases.service';

@Component({
  selector: 'modificar_secciones',
  templateUrl: 'modificar_secciones.template.html'
})


export class ModificarSeccionesComponent implements OnInit{

	private secciones:any;
	private order:string;
    private ascendent:boolean;
    private requestOffsetRight:number;//requestTable offset to control request browsing
    private requestOffsetLeft:number;//requestTable offset to control request browsing
    private offsetView:number;
    private temp_secciones:any;
    private search_string:string;
    private agregar_secciones_form:FormGroup;
    private submit_add:boolean;
    private grados:any;
    private maestros:any;
    private clases:any;

	constructor(form_builder: FormBuilder, private router:Router, private service:AdminSeccionesService, private servicem:AdminMaestrosService, private serviceg:AdminGradosService, private servicec:AdminClasesService){
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
        this.grados = [];
        this.maestros = [];
        this.clases = [];
        this.requestOffsetRight = 0;//set as 0
        this.requestOffsetLeft = 0;//set as 0
        this.offsetView = 5;
		this.secciones = [];
		this.temp_secciones = [];
		this.search_string = "";
	}

	ngOnInit() {
    
        this.get_secciones();
        this.get_grados();
        this.get_maestros();
        this.get_clases();
    }


    modificar_seccion(){
        console.log("rrrrrrrrrrrrr");
        if(this.agregar_secciones_form.valid){
          this.submit_add = true;
        //  var IDclase_temp = new Date(this.agregar_secciones_form.controls['IDclase'].value);
          //var date_string = IDclase_temp.toISOString().slice(0, 10).replace('T', ' ');
          var load = {
            IDgrado:this.agregar_secciones_form.controls['IDgrado'].value, 
            IDmaestro:this.agregar_secciones_form.controls['IDmaestro'].value, 
            IDclase:this.agregar_secciones_form.controls['IDclase'].value,
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
    get_maestros(){
        var response;
        this.servicem.get_maestros().subscribe(
            //store response
            data => response = data,
            err => console.log(err),
            ()=> {
                if(response && response != -1){//if not null
                    this.maestros = response;
                }else{
                    this.maestros = [];
                }
               
            }
        );
    }
    get_grados(){
      var response;
      this.serviceg.get_grados().subscribe(
          //store response
          data => response = data,
          err => console.log(err),
          ()=> {
              if(response && response != -1){//if not null
                  this.grados = response;
                  console.log(this.grados);
                  console.log("peeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")          
              }else{
                  this.grados = [];
                 
              }
             
          }
      );
    }
    get_clases(){
      var response;
      this.servicec.get_clases().subscribe(
          //store response
          data => response = data,
          err => console.log(err),
          ()=> {
              if(response && response != -1){//if not null
                  this.clases = response;
           
              }else{
                  this.clases = [];
                
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
