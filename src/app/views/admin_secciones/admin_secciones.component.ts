import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'; 
import {ModalDirective} from "ngx-bootstrap";
import {Router} from '@angular/router';
import {default as swal} from 'sweetalert2';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import {AdminSeccionesService} from './admin_secciones.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
declare var pdfMake: any;

@Component({
  selector: 'admin_secciones',
  templateUrl: 'admin_secciones.template.html'
})


export class AdminSeccionesComponent implements OnInit{
	@ViewChild('buscar_modal') public buscar_modal:ModalDirective;
	@ViewChild('agregar_modal') public agregar_modal:ModalDirective;
	@ViewChild('editar_modal') public editar_modal:ModalDirective;
	@ViewChild('ver_modal') public ver_modal:ModalDirective;

	public resultados_loading:boolean;
	public datatable_options:any;
	public alumnos_datatable_options:any;
	public alumnos_agregados_datatable_options:any;
	public resultados:any[];
	public clases:any[];
	public grados:any[];
	public maestros:any[];
	public alumnos:any[];
	public alumnos_agregados:any[];
	public alumnos_seccion:any[];
	public search_form:FormGroup;
	public add_form:FormGroup;
	public editar_form:FormGroup;
	public ver_form:FormGroup;
	public codigo_mask:any;
	public fecha_mask:any;
	public submit_add:boolean;
	public submit_edit:boolean;
	public loading_add:boolean;
	public loading_edit:boolean;
	public calendario: INgxMyDpOptions;

	constructor(form_builder: FormBuilder, private router:Router, private service:AdminSeccionesService){
		this.clases = [];
		this.maestros = [];
		this.grados = [];
		this.alumnos = [];
		this.alumnos_agregados = [];
		this.alumnos_seccion = [];
		this.resultados_loading = false;
		this.submit_add = false;
		this.submit_edit = false;
		this.loading_add = false;
		this.loading_edit = false;
		this.resultados = [];
		this.codigo_mask = createNumberMask({allowNegative:false, allowDecimal:false, integerLimit:8, prefix:'', includeThousandsSeparator:false})
		this.fecha_mask = [/[1-2]/,/[0-9]/,/[0-9]/,/[0-9]/,'-',/[0-1]/,/[0-9]/,'-',/[0-3]/,/[0-9]/];
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
		this.search_form = form_builder.group({
            'codigo' : [""],
            'grado' : [""],
            'maestro' : [""],
            'clase' :[""]
        })

        this.add_form = form_builder.group({
            'codigo_grado' : ["", Validators.compose([Validators.required])],
            'codigo_maestro' :["", Validators.compose([Validators.required])],
            'codigo_clase' :["", Validators.compose([Validators.required])]
        })

        this.editar_form = form_builder.group({
        	'codigo' : [{value:"", disabled:true}],
            'codigo_grado' : ["", Validators.compose([Validators.required])],
            'codigo_maestro' :["", Validators.compose([Validators.required])],
            'codigo_clase' :["", Validators.compose([Validators.required])]
        })

        this.ver_form = form_builder.group({
        	'codigo' : [{value:"", disabled:true}],
        	'codigo_grado' : [{value:"", disabled:true}],
            'codigo_maestro' : [{value:"", disabled:true}],
            'codigo_clase' : [{value:"", disabled:true}]
        })

		this.datatable_options = {
	      title:'Administrar Secciones',
	      empty_text:'No existen secciones que cumplan con el filtro seleccionado',
	      columns:['codigo','grado','maestro','clase'],
	      columns_headers:['Código','Grado','Maestro','Clase'],
	      columns_types:['text','text','text','text'],
	      options:{delete:true, edit:true, view:true},
	      options_header:'Opciones',
	      navigation_offsets:[5,10,15,25,50,100,200],
	      navigation_starting_offset_index:1,
	      show_search_field:true
	    }

	    this.alumnos_datatable_options = {
	      title:'Agregar Alumnos a Sección',
	      empty_text:'No existen alumnos que cumplan con el filtro seleccionado',
	      columns:['codigo','nombres','apellidos'],
	      columns_headers:['Código','Nombres','Apellidos'],
	      columns_types:['text','text','text'],
	      options:{delete:false, edit:false, view:false, add:true},
	      options_header:'Opciones',
	      navigation_offsets:[5,10,15,25,50,100,200],
	      navigation_starting_offset_index:1,
	      show_search_field:true
	    }

	    this.alumnos_agregados_datatable_options = {
	      title:'Alumnos Agregados',
	      empty_text:'Listado Vacío',
	      columns:['codigo','nombres','apellidos'],
	      columns_headers:['Código','Nombres','Apellidos'],
	      columns_types:['text','text','text'],
	      options:{delete:true, edit:false, view:false, add:false},
	      options_header:'Opciones',
	      navigation_offsets:[5,10,15,25,50,100,200],
	      navigation_starting_offset_index:1,
	      show_search_field:true
	    }
	}

	ngOnInit() {
		this.get_clases();
		this.get_grados();
		this.get_maestros();
		this.do_search();
		this.get_alumnos();
		this.get_alumnos_seccion();
    }

    get_clases(){
    	var response;
    	this.service.get_listado_clases().subscribe(
	        data => response = data,
	        err => {console.log(err);},
	        ()=> {
	            if(response && response!=-1){
	              	this.clases = response;
	            }else{
	            }
	        }
	    );
    }

    get_grados(){
    	var response;
    	this.service.get_listado_grados().subscribe(
	        data => response = data,
	        err => {console.log(err);},
	        ()=> {
	            if(response && response!=-1){
	              	this.grados = response;
	            }else{
	            }
	        }
	    );
    }

    get_maestros(){
    	var response;
    	this.service.get_listado_maestros().subscribe(
	        data => response = data,
	        err => {console.log(err);},
	        ()=> {
	            if(response && response!=-1){
	              	this.maestros = response;
	            }else{
	            }
	        }
	    );
    }
    
    get_alumnos(){
    	var response;
    	this.service.get_listado_alumnos().subscribe(
	        data => response = data,
	        err => {console.log(err);},
	        ()=> {
	            if(response && response!=-1){
	              	this.alumnos = response;
	            }else{
	            }
	        }
	    );
    }

    get_alumnos_seccion(){
    	var response;
    	this.service.get_listado_alumnos_seccion().subscribe(
	        data => response = data,
	        err => {console.log(err);},
	        ()=> {
	            if(response && response!=-1){
	              	this.alumnos_seccion = response;
	            }else{
	            }
	        }
	    );
    }
    
    transfer_alumno(alumno){
    	var exists = false;
    	for(var i = 0;i<this.alumnos_agregados.length;i++){
    		if(this.alumnos_agregados[i].codigo == alumno.codigo){
    			exists = true;
    		}
    	}
    	if(!exists){
    		this.alumnos_agregados.push(alumno);
    	}
    	
    }

    remove_alumno(alumno){
    	for(var i = 0;i<this.alumnos_agregados.length;i++){
    		if(this.alumnos_agregados[i].codigo == alumno.codigo){
    			this.alumnos_agregados.splice(i,1);
    			break;
    		}
    	}
    }

    do_search(){
    	this.resultados_loading = true;
    	this.resultados = [];
    	this.buscar_modal.hide();
		var response;
		var params={
			codigo:this.search_form.controls['codigo'].value, 
			grado:this.search_form.controls['grado'].value, 
			maestro:this.search_form.controls['maestro'].value, 
			clase:this.search_form.controls['clase'].value
		}
		this.service.get_secciones(params).subscribe(
			//store response
			data => response = data,
			err => {console.log(err);this.resultados_loading = false;},
			()=> {
				if(response && response != -1){
					this.resultados = response;
					
					this.resultados_loading = false;
				}else{
					this.resultados = [];
					this.resultados_loading = false;
				}
			   
			}
		);
	}

	open_search(){

		this.buscar_modal.show();
	}

	close_search(){

		this.buscar_modal.hide();
	}

	clean_search(){
		this.search_form.controls['codigo'].setValue("");
		this.search_form.controls['grado'].setValue("");
		this.search_form.controls['maestro'].setValue("");
		this.search_form.controls['clase'].setValue("");
	}

	do_add(){
		if(this.add_form.valid){
			this.loading_add = true;
			var load = {
		        codigo_grado:this.add_form.controls['codigo_grado'].value, 
		        codigo_maestro:this.add_form.controls['codigo_maestro'].value, 
		        codigo_clase: this.add_form.controls['codigo_clase'].value,
		        alumnos: this.alumnos_agregados
		    };
		    var response;
			this.service.post_secciones(load).subscribe(
		        data => response = data[0],
		        err => {console.log(err);this.internalServerError();this.loading_add = false;},
		        ()=> {
		            if(response && response!=-1){
		              	this.clean_add();
	        			this.agregar_modal.hide();
		              	this.do_search();
		              	this.get_alumnos_seccion();
		              	this.agregar_success(response.hash);
		              	this.loading_add = false;
		            }else{
		              	this.internalServerError();
		              	this.loading_add = false;
		            }
		        }
		    );
		}else{
			this.submit_add = true;
			this.loading_add = false;
		}
	}

	open_add(){
		this.clean_add();
		this.agregar_modal.show();
	}

	close_add(){
		swal({
	      title: '<i class="fa  fa-warning text-warning"></i> <span class="swal-title">Cancelar</span>',
	      html: "<span class='swal-text'>¿Está seguro que desea cancelar la adición?</span>",
	      width:"400px",
	      showCancelButton: true,
	      confirmButtonColor: '#D32C53',
	      cancelButtonColor: '#57889c',
	      confirmButtonText: 'Sí, Cancelar',
	      cancelButtonText: 'No'
	    }).then((result) => {
	      if (result.value) {
	      	this.clean_add();
	        this.agregar_modal.hide();
	      }
	    })
	}

	clean_add(){
		this.add_form.controls['codigo_grado'].setValue("");
		this.add_form.controls['codigo_maestro'].setValue("");
		this.add_form.controls['codigo_clase'].setValue("");
		this.alumnos_agregados = [];
		this.submit_add = false;
	}

	do_edit(){
    	if(	this.editar_form.valid){
			this.loading_edit = true;
			var load = {
				codigo:this.editar_form.controls['codigo'].value, 
		        codigo_grado:this.editar_form.controls['codigo_grado'].value, 
		        codigo_maestro:this.editar_form.controls['codigo_maestro'].value, 
		        codigo_clase: this.editar_form.controls['codigo_clase'].value,
		        alumnos: this.alumnos_agregados
		    };
		    var response;
			this.service.update_secciones(load).subscribe(
		        data => response = data,
		        err => {console.log(err);this.internalServerError();this.loading_edit = false;},
		        ()=> {
		            if(response && response!=-1){
	        			this.editar_modal.hide();
		              	this.do_search();
		              	this.get_alumnos_seccion();
		              	this.editar_success();
		              	this.loading_edit = false;
		            }else{
		              	this.internalServerError();
		              	this.loading_edit = false;
		            }
		        }
		    );
		}else{
			this.submit_edit = true;
			this.loading_edit = false;
		}
    }

	open_edit(seccion){
		this.submit_edit = false;
		this.loading_edit = false;
    	this.editar_form.controls['codigo'].setValue(seccion.codigo);
    	this.editar_form.controls['codigo_grado'].setValue(seccion.codigo_grado);
		this.editar_form.controls['codigo_maestro'].setValue(seccion.codigo_maestro);
		this.editar_form.controls['codigo_clase'].setValue(seccion.codigo_clase);
		this.alumnos_agregados = [];
		for(var i = 0;i<this.alumnos.length;i++){
			for(var j = 0;j<this.alumnos_seccion.length;j++){
				if(this.alumnos_seccion[j].codigo_seccion == seccion.codigo && this.alumnos_seccion[j].codigo_alumno == this.alumnos[i].codigo){
					this.alumnos_agregados.push(this.alumnos[i]);
				}
			}
		}
		this.editar_modal.show();
    }

    close_edit(){
		swal({
	      title: '<i class="fa  fa-warning text-warning"></i> <span class="swal-title">Cancelar</span>',
	      html: "<span class='swal-text'>¿Está seguro que desea cancelar la edición?</span>",
	      width:"400px",
	      showCancelButton: true,
	      confirmButtonColor: '#D32C53',
	      cancelButtonColor: '#57889c',
	      confirmButtonText: 'Sí, Cancelar',
	      cancelButtonText: 'No'
	    }).then((result) => {
	      if (result.value) {
	        this.editar_modal.hide();
	      }
	    })
	}

    delete_alumno(seccion){
    	swal({
		    title: '<i class="fa  fa-warning text-warning"></i> <span class="swal-title">Eliminar</span>',
		    html: "<span class='swal-text'>¿Está seguro que desea eliminar la seccion?</span>",
		    width:"400px",
		    showCancelButton: true,
		    confirmButtonColor: '#D32C53',
		    cancelButtonColor: '#57889c',
		    confirmButtonText: 'Sí, Eliminar',
		    cancelButtonText: 'No'
		}).then((result) => {
		    if (result.value) {
		    	var response;
		    	this.service.delete_secciones(seccion.codigo).subscribe(
			        data => response = data,
			        err => {console.log(err);this.internalServerError();},
			        ()=> {
			            if(response && response!=-1){
			              	this.do_search();
			              	this.delete_success();
			            }else{
			              	this.internalServerError();
			            }
			        }
			    );
		    }
		})
    }

    open_view(seccion){
    	this.ver_form.controls['codigo'].setValue(seccion.codigo);
    	this.ver_form.controls['codigo_grado'].setValue(seccion.codigo_grado);
    	this.ver_form.controls['codigo_maestro'].setValue(seccion.codigo_maestro);
    	this.ver_form.controls['codigo_clase'].setValue(seccion.codigo_clase);
    	this.ver_modal.show();
    }

    close_view(){

		this.ver_modal.hide();
	}

    internalServerError() {
    	swal({
          title: "Error Interno del Servidor",
          text: "Error interno del servidor, por favor vuelva a intentarlo o contacte a su administrador.",
          type: "warning",
          allowOutsideClick: false
      	}).catch(swal.noop)
  	}

  	agregar_success(hash) {
      	swal({
          	title: "Agregado Exitosamente",
          	text: "Sección agregada de forma exitosa.",
          	confirmButtonText: '<i class="fa fa-thumbs-up"></i> Genial!',
          	allowOutsideClick: false,
          	type: "success"
      	}).catch(swal.noop)
  	}

  	editar_success() {
      	swal({
          	title: "Editado Exitosamente",
          	text: "Sección editada de forma exitosa.",
          	confirmButtonText: '<i class="fa fa-thumbs-up"></i> Genial!',
          	allowOutsideClick: false,
          	type: "success"
      	}).catch(swal.noop)
  	}

  	delete_success() {
      	swal({
          	title: "Eliminado Exitosamente",
          	text: "Sección eliminada de forma exitosa.",
          	confirmButtonText: '<i class="fa fa-thumbs-up"></i> Genial!',
          	allowOutsideClick: false,
          	type: "success"
      	}).catch(swal.noop)
  	}

}