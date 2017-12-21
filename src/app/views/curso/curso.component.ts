import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router, ActivatedRoute } from '@angular/router';
import { default as swal } from 'sweetalert2';
import {CursoService} from './curso.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import {ModalDirective} from "ngx-bootstrap";

@Component({
  selector: 'curso',
  templateUrl: 'curso.template.html'
})


export class CursoComponent implements OnInit{
	@ViewChild('agregar_tarea_modal') public agregar_tarea_modal:ModalDirective;
	@ViewChild('view_tarea_modal') public ver_tarea_modal:ModalDirective;
	@ViewChild('editar_tarea_modal') public editar_tarea_modal:ModalDirective;
    @ViewChild('alumnos_modal') public alumnos_modal:ModalDirective;
    @ViewChild('calificar_modal') public calificar_modal:ModalDirective;
    @ViewChild('ver_notas_modal') public ver_notas_modal:ModalDirective;
    @ViewChild('add_tarea_form') public add_tarea_form;
    @ViewChild('editar_tarea_form') public editar_tarea_form;
	public sub:any;
	public codigo:any;
	public curso:any;
	public calendario: INgxMyDpOptions;
	public fecha_mask:any;
	public view_tarea_form:FormGroup;
	public submit_add_tarea:boolean;
	public submit_edit_tarea:boolean;
	public valor_mask:any;
	public loading_add:boolean;
	public tareas:any[];
	public parcial:number;
    public tarea_object:any;
    public tarea_object_edit:any;
    public alumnos:any[];
    public current_tarea:number;
    public notas:any[];
	constructor(form_builder: FormBuilder, private router:Router, private route: ActivatedRoute,private service:CursoService){
		this.curso = {};
		this.tareas = [];
        this.alumnos = [];
        this.notas = [];
		this.parcial = 1;
		this.loading_add = false;
		this.submit_add_tarea = false;
        this.submit_edit_tarea = false;
        this.current_tarea = 0;
		this.fecha_mask = [/[1-2]/,/[0-9]/,/[0-9]/,/[0-9]/,'-',/[0-1]/,/[0-9]/,'-',/[0-3]/,/[0-9]/];
		this.valor_mask = createNumberMask({allowNegative:false, allowDecimal:false, integerLimit:3, prefix:'', includeThousandsSeparator:false})
		this.calendario={
			dateFormat: 'yyyy-mm-dd',
	        dayLabels: {su: 'D', mo: 'L', tu: 'M', we: 'M', th: 'J', fr: 'V', sa: 'S'},
	        monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
	        todayBtnTxt: "HOY",
	        selectorWidth:'200px',
	        selectorHeight:'200px',
	        sunHighlight:false,
	        showSelectorArrow:false,
	        openSelectorTopOfInput:false
		};
        this.tarea_object = {
            codigo:"",
            nombre:"",
            valor:"",
            descripcion:"",
            fecha_inicio:"",
            fecha_final:""
        }
        this.tarea_object_edit = {
            codigo:"",
            nombre:"",
            valor:"",
            descripcion:"",
            fecha_inicio:"",
            fecha_final:""
        }
	}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
	       this.codigo = +params['id']; 
	       this.get_curso();
	       this.get_tareas();
           this.get_alumnos_curso();
	    });
    }

    set_fecha_inicio(event: IMyDateModel){
    	var dia;
    	var mes;
    	if(event.date.day < 10){
    		dia = "0" + event.date.day;
    	}else{
    		dia = event.date.day;
    	}
    	if(event.date.month < 10){
    		mes = "0" + event.date.month;
    	}else{
    		mes =  event.date.month;
    	}
    	this.tarea_object.fecha_inicio= event.date.year + "-" + mes +"-"+dia;
    }

    set_fecha_final(event: IMyDateModel){
    	var dia;
    	var mes;
    	if(event.date.day < 10){
    		dia = "0" + event.date.day;
    	}else{
    		dia = event.date.day;
    	}
    	if(event.date.month < 10){
    		mes = "0" + event.date.month;
    	}else{
    		mes =  event.date.month;
    	}
    	this.tarea_object.fecha_final= event.date.year + "-" + mes +"-"+dia;
    }

    validate_trim(value){
    	if(value.trim() == ""){
    		return false;
    	}else{
    		return true;
    	}
    }

    get_curso(){
    	var response;
    	this.service.get_curso(this.codigo).subscribe(
	        data => response = data[0],
	        err => {console.log(err);},
	        ()=> {
	            if(response && response!=-1){
	              	this.curso = response;
	            }else{

	            }
	        }
	    );
    }

    get_alumnos_curso(){
        var response;
        this.service.get_alumnos_curso(this.codigo).subscribe(
            data => response = data,
            err => {console.log(err);},
            ()=> {
                if(response && response!=-1){
                      this.alumnos = response;
                      console.log(this.alumnos);
                }else{

                }
            }
        );
    }

    get_tareas(){
    	var response;
        this.tareas = [];
    	this.service.get_tarea_curso(this.codigo).subscribe(
	        data => response = data,
	        err => {console.log(err);},
	        ()=> {
	            if(response && response!=-1){
	            	for(var i = 0;i<response.length;i++){
						response[i].fecha_inicio = response[i].fecha_inicio.substring(0,10);
						response[i].fecha_final = response[i].fecha_final.substring(0,10);
					}
	              	this.tareas = response;
	            }else{

	            }
	        }
	    );
    }

    get_calificaciones(index){
        var response;
        var load = {codigo:this.codigo, codigo_tarea:index}
        this.notas = [];
        this.service.get_calificaciones(load).subscribe(
            data => response = data,
            err => {console.log(err);},
            ()=> {
               this.notas = response;
            }
        );
    }

    get_tareas_edit(){
        var response;
        this.service.get_tarea_curso(this.codigo).subscribe(
            data => response = data,
            err => {console.log(err);},
            ()=> {
                if(response && response!=-1){
                    for(var i = 0;i<response.length;i++){
                        response[i].fecha_inicio = response[i].fecha_inicio.substring(0,10);
                        response[i].fecha_final = response[i].fecha_final.substring(0,10);
                    }
                      this.tareas = response;
                      this.editar_success();
                      this.loading_add = false;
                }else{

                }
            }
        );
    }

    get_tareas_delete(){
        var response;
        this.service.get_tarea_curso(this.codigo).subscribe(
            data => response = data,
            err => {console.log(err);},
            ()=> {
                if(response && response!=-1){
                    for(var i = 0;i<response.length;i++){
                        response[i].fecha_inicio = response[i].fecha_inicio.substring(0,10);
                        response[i].fecha_final = response[i].fecha_final.substring(0,10);
                    }
                      this.tareas = response;
                      this.eliminado_success();
                      this.loading_add = false;
                }else{

                }
            }
        );
    }

    close_tarea_add(){
    	this.agregar_tarea_modal.hide();
    }

    open_tarea_add(parcial){
    	this.parcial = parcial;
    	this.agregar_tarea_modal.show();
    }

    close_tarea_view(){
    	this.ver_tarea_modal.hide();
    }

    close_tarea_edit(){
    	this.editar_tarea_modal.hide();
    }

    calificar(codigo, tarea, valor){
        var load = {
            codigo_tarea:tarea,
            valor:valor,
            codigo_alumno: codigo,
            codigo_curso:this.codigo

        };
        var response;
        this.service.calificar(load).subscribe(
            data => response = data,
            err => {console.log(err);this.internalServerError();this.loading_add = false;},
            ()=> {
                if(response && response!=-1){

                }else{
                }
            }
        );
        console.log(codigo);
        console.log(tarea);
        console.log(valor);
    }

    close_alumnos(){
        this.alumnos_modal.hide();
    }

    close_calificar(){
        this.calificar_modal.hide();
    }

    close_notas(){
        this.ver_notas_modal.hide();
    }

    open_notas(){
        this.ver_notas_modal.show();
    }

    ver_notas(index){
        this.get_calificaciones(this.tareas[index].codigo);
        this.open_notas();
    }

    open_calificar(index){
        this.calificar_modal.show();
        this.current_tarea = index;
    }

    open_alumnos(){
        this.alumnos_modal.show();
    }

    tarea_edit(){
        if( this.editar_tarea_form.valid){
            this.loading_add = true;
            var load = {
                nombre:this.tarea_object_edit.nombre, 
                valor:this.tarea_object_edit.valor, 
                descripcion: this.tarea_object_edit.descripcion,
                fecha_inicio: this.tarea_object_edit.fecha_inicio,
                fecha_final: this.tarea_object_edit.fecha_final,
                codigo: this.tarea_object_edit.codigo

            };
            var response;
            this.service.update_tarea(load).subscribe(
                data => response = data,
                err => {console.log(err);this.internalServerError();this.loading_add = false;},
                ()=> {
                    if(response && response!=-1){
                        this.clean_tarea_add();
                        this.editar_tarea_modal.hide();
                        this.get_tareas_edit();
                    }else{
                          this.internalServerError();
                          this.loading_add = false;
                    }
                }
            );
        }else{
            this.submit_edit_tarea = true;
        }
    }

    clean_tarea_add(){
    	this.tarea_object.nombre = "";
		this.tarea_object.valor = "";
		this.tarea_object.descripcion = "";
		this.tarea_object.fecha_inicio = "";
		this.tarea_object.fecha_final = "";
		this.submit_add_tarea = false;
    }

    tarea_view(index){
    	this.tarea_object.codigo = this.tareas[index].codigo;
        this.tarea_object.nombre = this.tareas[index].nombre;
        this.tarea_object.valor = this.tareas[index].valor;
        this.tarea_object.descripcion = this.tareas[index].descripcion;
        this.tarea_object.fecha_inicio = this.tareas[index].fecha_inicio;
        this.tarea_object.fecha_final = this.tareas[index].fecha_final;
    	this.ver_tarea_modal.show();
    }

    open_tarea_edit(index){
    	this.tarea_object_edit.codigo = this.tareas[index].codigo;
    	this.tarea_object_edit.nombre = this.tareas[index].nombre;
    	this.tarea_object_edit.valor = this.tareas[index].valor;
    	this.tarea_object_edit.descripcion = this.tareas[index].descripcion;
    	this.tarea_object_edit.fecha_inicio = this.tareas[index].fecha_inicio;
    	this.tarea_object_edit.fecha_final = this.tareas[index].fecha_final;
    	this.editar_tarea_modal.show();
    }

    tarea_add(){
    	if(	this.add_tarea_form.valid && 
			this.validate_trim(this.tarea_object.nombre) && 
			this.validate_trim(this.tarea_object.descripcion)){
			this.loading_add = true;
			var load = {
		        nombre:this.tarea_object.nombre, 
		        valor:this.tarea_object.valor, 
		        descripcion: this.tarea_object.descripcion,
		        fecha_inicio: this.tarea_object.fecha_inicio,
		        fecha_final: this.tarea_object.fecha_final,
		        parcial:this.parcial,
		        codigo_seccion: this.curso.codigo

		    };
		    var response;
			this.service.insert_tarea(load).subscribe(
		        data => response = data,
		        err => {console.log(err);this.internalServerError();this.loading_add = false;},
		        ()=> {
		            if(response && response!=-1){
		              	this.clean_tarea_add();
	        			this.agregar_tarea_modal.hide();
	        			this.get_tareas();
		              	this.agregar_success();
		              	this.loading_add = false;
		            }else{
		              	this.internalServerError();
		              	this.loading_add = false;
		            }
		        }
		    );
		}else{
			this.submit_add_tarea = true;
		}
    }

    tarea_delete(index){
        swal({
          title: '<i class="fa  fa-warning text-warning"></i> <span class="swal-title">Eliminar</span>',
          html: "<span class='swal-text'>¿Está seguro que desea eliminar la tarea?</span>",
          width:"400px",
          showCancelButton: true,
          confirmButtonColor: '#D32C53',
          cancelButtonColor: '#57889c',
          confirmButtonText: 'Sí, Eliminar',
          cancelButtonText: 'No'
        }).then((result) => {
            
          if (result.value) {
              var response;
            this.loading_add = true;
              this.service.delete_tarea(this.tareas[index].codigo).subscribe(
                data => response = data,
                err => {console.log(err);this.internalServerError();this.loading_add = false;},
                ()=> {
                    if(response && response!=-1){
                        this.clean_tarea_add();
                        this.editar_tarea_modal.hide();
                        this.get_tareas_delete();
                    }else{
                          this.internalServerError();
                          this.loading_add = false;
                    }
                }
            );
          }
        })
    }

    internalServerError() {
    	swal({
          title: "Error Interno del Servidor",
          text: "Error interno del servidor, por favor vuelva a intentarlo o contacte a su administrador.",
          type: "warning",
          allowOutsideClick: false
      	}).catch(swal.noop)
  	}

  	agregar_success() {
      	swal({
          	title: "Agregado Exitosamente",
          	text: "Tarea agregada de forma exitosa.",
          	confirmButtonText: '<i class="fa fa-thumbs-up"></i> Genial!',
          	allowOutsideClick: false,
          	type: "success"
      	}).catch(swal.noop)
  	}

      editar_success() {
          swal({
              title: "Editado Exitosamente",
              text: "Tarea editada de forma exitosa.",
              confirmButtonText: '<i class="fa fa-thumbs-up"></i> Genial!',
              allowOutsideClick: false,
              type: "success"
          }).catch(swal.noop)
      }

      eliminado_success() {
          swal({
              title: "Eliminado Exitosamente",
              text: "Tarea eliminada de forma exitosa.",
              confirmButtonText: '<i class="fa fa-thumbs-up"></i> Genial!',
              allowOutsideClick: false,
              type: "success"
          }).catch(swal.noop)
      }
}