import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { AdminAlumnosService } from '../admin_alumnos.service';

@Component({
  selector: 'modificar_alumnos',
  templateUrl: 'modificar_alumnos.template.html'
})


export class ModificarAlumnosComponent implements OnInit{

	private alumnos:any;
	private order:string;
    private ascendent:boolean;
    private requestOffsetRight:number;//requestTable offset to control request browsing
    private requestOffsetLeft:number;//requestTable offset to control request browsing
    private offsetView:number;
    private temp_alumnos:any;
    private search_string:string;
    private agregar_alumnos_form:FormGroup;
    private submit_add:boolean;

	constructor(form_builder: FormBuilder, private router:Router, private service:AdminAlumnosService){
        this.submit_add = false;
            this.agregar_alumnos_form = form_builder.group({
            'nombres' : ["", Validators.required],
            'apellidos' : ["", Validators.required],
            'nacimiento' : ["", Validators.required],
            'departamento' : ["", Validators.required],
            'alumno_id':["", Validators.required]
        })
		this.order = "";
        this.ascendent = false;
        this.requestOffsetRight = 0;//set as 0
        this.requestOffsetLeft = 0;//set as 0
        this.offsetView = 5;
		this.alumnos = [];
		this.temp_alumnos = [];
		this.search_string = "";
	}

	ngOnInit() {
		this.get_alumnos();
    }

    modificar_alumno(){
        if(this.agregar_alumnos_form.valid){
          this.submit_add = true;
          var nacimiento_temp = new Date(this.agregar_alumnos_form.controls['nacimiento'].value);
          var date_string = nacimiento_temp.toISOString().slice(0, 10).replace('T', ' ');
          var load = {
            nombres:this.agregar_alumnos_form.controls['nombres'].value, 
            apellidos:this.agregar_alumnos_form.controls['apellidos'].value, 
            nacimiento: date_string,
            departamento: this.agregar_alumnos_form.controls['departamento'].value,
            alumno_id:this.agregar_alumnos_form.controls['alumno_id'].value
          };
          var response;
          this.service.update_alumno(load).subscribe(
            //store response
            data => response = data,
            err => console.log(err),
            ()=> {
                if(response && response!=-1){//if not null, undefined,  or error
                    for(var i = 0; i<this.alumnos.length;i++){
                        if(this.alumnos[i].alumno_id == this.agregar_alumnos_form.controls['alumno_id'].value){
                            this.alumnos[i].nombres = this.agregar_alumnos_form.controls['nombres'].value;
                            this.alumnos[i].apellidos = this.agregar_alumnos_form.controls['apellidos'].value;
                            this.alumnos[i].nacimiento = this.agregar_alumnos_form.controls['nacimiento'].value;
                            this.alumnos[i].departamento = this.agregar_alumnos_form.controls['departamento'].value;
                        }
                    }
                    for(var i = 0; i<this.temp_alumnos.length;i++){
                        if(this.temp_alumnos[i].alumno_id == this.agregar_alumnos_form.controls['alumno_id'].value){
                            this.temp_alumnos[i].nombres = this.agregar_alumnos_form.controls['nombres'].value;
                            this.temp_alumnos[i].apellidos = this.agregar_alumnos_form.controls['apellidos'].value;
                            this.temp_alumnos[i].nacimiento = this.agregar_alumnos_form.controls['nacimiento'].value;
                            this.temp_alumnos[i].departamento = this.agregar_alumnos_form.controls['departamento'].value;
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

    get_alumnos(){
        var response;
        this.service.get_alumnos().subscribe(
            //store response
            data => response = data,
            err => console.log(err),
            ()=> {
                if(response && response != -1){//if not null
                    this.alumnos = response;
                    this.temp_alumnos = response;
                    this.update_offsets();
                }else{
                    this.alumnos = [];
                    this.temp_alumnos = [];
                    this.requestOffsetRight = 0;//set as 0
        			this.requestOffsetLeft = 0;//set as 0
                }
               
            }
        );
    }

    update_offsets(){
    	if(this.alumnos.length > 0){
            //Verify if requestOffsetRight overloads requests length
            if(this.alumnos.length < this.offsetView){
                this.requestOffsetRight = this.alumnos.length;
            }else{//if not, set to 5
                this.requestOffsetRight = this.offsetView;
            }
            this.requestOffsetLeft = 1;
        }else{
        	this.requestOffsetRight = 0;//set as 0
			this.requestOffsetLeft = 0;//set as 0
        }
    }

    set_alumno(id){
        this.submit_add = false;
        this.agregar_alumnos_form.controls['alumno_id'].setValue(this.alumnos[id].alumno_id);
    	this.agregar_alumnos_form.controls['nombres'].setValue(this.alumnos[id].nombres);
    	this.agregar_alumnos_form.controls['apellidos'].setValue(this.alumnos[id].apellidos);
    	this.agregar_alumnos_form.controls['departamento'].setValue(this.alumnos[id].departamento);
    	this.agregar_alumnos_form.controls['nacimiento'].setValue(this.alumnos[id].nacimiento.substring(0,10));
    	
    }

    search_alumno(){
    	this.alumnos = [];
    	if(this.search_string.trim().length > 0){
    		for(var i = 0; i<this.temp_alumnos.length;i++){
	    		if(this.temp_alumnos[i].nombres.toLowerCase().includes(this.search_string.toLowerCase().trim()) || this.temp_alumnos[i].apellidos.toLowerCase().includes(this.search_string.toLowerCase().trim()) || (this.temp_alumnos[i].alumno_id+"").toLowerCase().includes(this.search_string.toLowerCase().trim())){
	    			this.alumnos.push(this.temp_alumnos[i]);
	    		}
	    	}
	    	this.update_offsets();
    	}else{
    		this.alumnos = this.temp_alumnos;
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
        this.alumnos.sort(function(a, b){
            var x = a.nombres.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
            var y = b.nombres.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
            if (x < y) {return 1;}
            if (x > y) {return -1;}
            return 0;
        });
    }

    sort_nombre_desc(){
        this.alumnos.sort(function(a, b){
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
        this.alumnos.sort(function(a, b){
            var x = a.alumno_id;
            var y = b.alumno_id;
            if (x < y) {return 1;}
            if (x > y) {return -1;}
            return 0;
        });
    }

    sort_id_desc(){
        this.alumnos.sort(function(a, b){
            var x = a.alumno_id;
            var y = b.alumno_id;
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
        this.alumnos.sort(function(a, b){
            var x = a.apellidos.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
            var y = b.apellidos.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
            if (x < y) {return 1;}
            if (x > y) {return -1;}
            return 0;
        });
    }

    sort_apellido_desc(){
        this.alumnos.sort(function(a, b){
            var x = a.apellidos.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
            var y = b.apellidos.toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
    }

    updateRequestsGoRight(){
        if(this.alumnos.length > 0){
            //Verify if requestOffsetRight overloads requests length
            if(this.alumnos.length< this.requestOffsetRight+this.offsetView){
                this.requestOffsetRight = this.alumnos.length;
            }else{//if not, set to 5
                this.requestOffsetRight = this.requestOffsetRight + this.offsetView;
            }
            this.requestOffsetLeft = this.requestOffsetLeft + this.offsetView;
        }
    }

    //updateRequestsGoLeft(): Update requests offsets when user clicks left arrow
    updateRequestsGoLeft(){
        if(this.alumnos.length > 0){
            //check if last element
            if(this.alumnos.length == this.requestOffsetRight){
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
          text: "Alumno modificado de forma exitosa.",
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