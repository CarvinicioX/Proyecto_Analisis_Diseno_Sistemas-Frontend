import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'; 
import {ModalDirective} from "ngx-bootstrap";
import {Router} from '@angular/router';
import {default as swal} from 'sweetalert2';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import {AdminGradosService} from './admin_grados.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
declare var pdfMake: any;

@Component({
  selector: 'admin_grados',
  templateUrl: 'admin_grados.template.html'
})


export class AdminGradosComponent implements OnInit{
	@ViewChild('agregar_modal') public agregar_modal:ModalDirective;
	@ViewChild('editar_modal') public editar_modal:ModalDirective;

	public resultados_loading:boolean;
	public datatable_options:any;
	public resultados:any[];
	public search_form:FormGroup;
	public add_form:FormGroup;
	public editar_form:FormGroup;
	public ver_form:FormGroup;
	public codigo_mask:any;
	public fecha_mask:any;
	public phone_mask:any;
	public submit_add:boolean;
	public submit_edit:boolean;
	public loading_add:boolean;
	public loading_edit:boolean;
	public calendario: INgxMyDpOptions;

	constructor(form_builder: FormBuilder, private router:Router, private service:AdminGradosService){
		this.resultados_loading = false;
		this.submit_add = false;
		this.submit_edit = false;
		this.loading_add = false;
		this.loading_edit = false;
		this.resultados = [];
		this.codigo_mask = createNumberMask({allowNegative:false, allowDecimal:false, integerLimit:10, prefix:'', includeThousandsSeparator:false})
		this.fecha_mask = [/[1-2]/,/[0-9]/,/[0-9]/,/[0-9]/,'-',/[0-1]/,/[0-9]/,'-',/[0-3]/,/[0-9]/];
		this.phone_mask = [/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,'-',/[0-9]/,/[0-9]/,'-',/[0-9]/,/[0-9]/];
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

        this.add_form = form_builder.group({
            'nombre' : ["", Validators.compose([Validators.required])]
        })

        this.editar_form = form_builder.group({
        	'codigo' : [{value:"", disabled:true}],
        	'nombre' : ["", Validators.compose([Validators.required])]
        })

		this.datatable_options = {
	      title:'Administrar Clases',
	      empty_text:'No existen clases para mostrar',
	      columns:['codigo','nombre'],
	      columns_headers:['Código','Nombre'],
	      columns_types:['number','text'],
	      options:{delete:true, edit:true, view:false},
	      options_header:'Opciones',
	      navigation_offsets:[5,10,15,25,50,100,200],
	      navigation_starting_offset_index:1,
	      show_search_field:true
	    }
	}

	ngOnInit() {
		this.get_grados();
    }

    validate_trim(value){
    	if(value.trim() == ""){
    		return false;
    	}else{
    		return true;
    	}
    }

	do_add(){
		if(	this.add_form.valid && 
			this.validate_trim(this.add_form.controls['nombre'].value)){
			this.loading_add = true;
			var load = {
		        nombre:this.add_form.controls['nombre'].value
		    };
		    var response;
			this.service.post_grado(load).subscribe(
		        data => response = data,
		        err => {console.log(err);this.internalServerError();this.loading_add = false;},
		        ()=> {
		            if(response && response!=-1){
		              	this.clean_add();
	        			this.agregar_modal.hide();
		              	this.get_grados();
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
		this.add_form.controls['nombre'].setValue("");
		this.submit_add = false;
	}

	do_edit(){
    	if(	this.editar_form.valid && 
			this.validate_trim(this.editar_form.controls['nombre'].value)){
			this.loading_edit = true;
			var load = {
				codigo:this.editar_form.controls['codigo'].value, 
		        nombre:this.editar_form.controls['nombre'].value
		    };
		    var response;
			this.service.update_grado(load).subscribe(
		        data => response = data,
		        err => {console.log(err);this.internalServerError();this.loading_edit = false;},
		        ()=> {
		            if(response && response!=-1){
	        			this.editar_modal.hide();
		              	this.get_grados();
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

    get_grados(){
    	var response;
    	this.resultados_loading = true;
    	this.service.get_listado_grados().subscribe(
	        data => response = data,
	        err => {console.log(err);this.internalServerError();this.resultados_loading = false;},
	        ()=> {
	            if(response && response!=-1){
	              	this.resultados = response;
	              	this.resultados_loading = false;
	            }else{
	              	this.internalServerError();
	              	this.resultados_loading = false;
	            }
	        }
	    );
    }

	open_edit(grado){
		this.submit_edit = false;
		this.loading_edit = false;
    	this.editar_modal.show();
    	this.editar_form.controls['codigo'].setValue(grado.codigo);
    	this.editar_form.controls['nombre'].setValue(grado.nombre);
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

    delete_alumno(grado){
    	swal({
		    title: '<i class="fa  fa-warning text-warning"></i> <span class="swal-title">Eliminar</span>',
		    html: "<span class='swal-text'>¿Está seguro que desea eliminar la clase?</span>",
		    width:"400px",
		    showCancelButton: true,
		    confirmButtonColor: '#D32C53',
		    cancelButtonColor: '#57889c',
		    confirmButtonText: 'Sí, Eliminar',
		    cancelButtonText: 'No'
		}).then((result) => {
		    if (result.value) {
		    	var response;
		    	this.service.delete_grado(grado.codigo).subscribe(
			        data => response = data,
			        err => {console.log(err);this.internalServerError();},
			        ()=> {
			            if(response && response!=-1){
			              	this.get_grados();
			              	this.delete_success();
			            }else{
			              	this.internalServerError();
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

  	agregar_success(hash) {
      	swal({
          	title: "Agregado Exitosamente",
          	text: "Grado agregado de forma exitosa.",
          	confirmButtonText: '<i class="fa fa-thumbs-up"></i> Genial!',
          	allowOutsideClick: false,
          	type: "success"
      	}).catch(swal.noop)
  	}

  	editar_success() {
      	swal({
          	title: "Editado Exitosamente",
          	text: "Grado editado de forma exitosa.",
          	confirmButtonText: '<i class="fa fa-thumbs-up"></i> Genial!',
          	allowOutsideClick: false,
          	type: "success"
      	}).catch(swal.noop)
  	}

  	delete_success() {
      	swal({
          	title: "Eliminado Exitosamente",
          	text: "Grado eliminado de forma exitosa.",
          	confirmButtonText: '<i class="fa fa-thumbs-up"></i> Genial!',
          	allowOutsideClick: false,
          	type: "success"
      	}).catch(swal.noop)
  	}

}