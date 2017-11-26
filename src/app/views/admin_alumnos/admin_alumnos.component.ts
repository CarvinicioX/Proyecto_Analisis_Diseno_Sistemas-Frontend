import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'; 
import {ModalDirective} from "ngx-bootstrap";
import {Router} from '@angular/router';
import {default as swal} from 'sweetalert2';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import {AdminAlumnosService} from './admin_alumnos.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
declare var pdfMake: any;

@Component({
  selector: 'admin_alumnos',
  templateUrl: 'admin_alumnos.template.html'
})


export class AdminAlumnosComponent implements OnInit{
	@ViewChild('buscar_modal') public buscar_modal:ModalDirective;
	@ViewChild('agregar_modal') public agregar_modal:ModalDirective;
	@ViewChild('editar_modal') public editar_modal:ModalDirective;
	@ViewChild('ver_modal') public ver_modal:ModalDirective;

	public resultados_loading:boolean;
	public datatable_options:any;
	public resultados:any[];
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

	constructor(form_builder: FormBuilder, private router:Router, private service:AdminAlumnosService){
		this.resultados_loading = false;
		this.submit_add = false;
		this.submit_edit = false;
		this.loading_add = false;
		this.loading_edit = false;
		this.resultados = [];
		this.codigo_mask = createNumberMask({allowNegative:false, allowDecimal:false, integerLimit:10, prefix:'', includeThousandsSeparator:false})
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
            'nombres' : [""],
            'apellidos' : [""],
            'nacimiento' :[""],
            'departamento' : [""]
        })

        this.add_form = form_builder.group({
            'nombres' : ["", Validators.compose([Validators.required])],
            'apellidos' : ["", Validators.compose([Validators.required])],
            'nacimiento' :["", Validators.compose([Validators.required, Validators.pattern('([0-9]{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\\d|30|31)')])],
            'nacimiento_temporal_reference' :[""],
            'departamento' : ["", Validators.compose([Validators.required])]
        })

        this.editar_form = form_builder.group({
        	'codigo' : [{value:"", disabled:true}],
            'nombres' : ["", Validators.compose([Validators.required])],
            'apellidos' : ["", Validators.compose([Validators.required])],
            'nacimiento' :["", Validators.compose([Validators.required, Validators.pattern('([0-9]{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\\d|30|31)')])],
            'nacimiento_temporal_reference' :[""],
            'departamento' : ["", Validators.compose([Validators.required])]
        })

        this.ver_form = form_builder.group({
        	'codigo' : [{value:"", disabled:true}],
        	'hash' : [{value:"", disabled:true}],
            'nombres' : [{value:"", disabled:true}],
            'apellidos' : [{value:"", disabled:true}],
            'nacimiento' :[{value:"", disabled:true}],
            'departamento' : [{value:"", disabled:true}]
        })

		this.datatable_options = {
	      title:'Administrar Alumnos',
	      empty_text:'No existen alumnos que cumplan con el filtro seleccionado',
	      columns:['codigo','nombres','apellidos','nacimiento', 'departamento'],
	      columns_headers:['Código','Nombres','Apellidos','Nacimiento','Departamento'],
	      columns_types:['text','text','text','text','text'],
	      options:{delete:true, edit:true, view:true},
	      options_header:'Opciones',
	      navigation_offsets:[5,10,15,25,50,100,200],
	      navigation_starting_offset_index:1,
	      show_search_field:true
	    }
	}

	ngOnInit() {
		this.do_search();
    }

    set_fecha_nacimiento(event: IMyDateModel){
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
    	this.add_form.controls['nacimiento'].setValue(event.date.year + "-" + mes +"-"+dia);
    }

    set_fecha_nacimiento_edit(event: IMyDateModel){
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
    	this.editar_form.controls['nacimiento'].setValue(event.date.year + "-" + mes +"-"+dia);
    }

    validate_fecha_nacimiento(){
    	var input_date = new Date(this.add_form.controls['nacimiento'].value);
    	var current_date = new Date();
    	if(input_date > current_date){
    		return false;
    	}else{
    		return true;
    	}
    }

    validate_fecha_nacimiento_edit(){
    	var input_date = new Date(this.editar_form.controls['nacimiento'].value);
    	var current_date = new Date();
    	if(input_date > current_date){
    		return false;
    	}else{
    		return true;
    	}
    }

    validate_trim(value){
    	if(value.trim() == ""){
    		return false;
    	}else{
    		return true;
    	}
    }

    do_search(){
    	this.resultados_loading = true;
    	this.resultados = [];
    	this.buscar_modal.hide();
		var response;
		var params={
			codigo:this.search_form.controls['codigo'].value, 
			nombres:this.search_form.controls['nombres'].value, 
			apellidos:this.search_form.controls['apellidos'].value, 
			nacimiento:this.search_form.controls['nacimiento'].value, 
			departamento:this.search_form.controls['departamento'].value
		}
		this.service.get_alumnos(params).subscribe(
			//store response
			data => response = data,
			err => {console.log(err);this.resultados_loading = false;},
			()=> {
				if(response && response != -1){
					for(var i = 0;i<response.length;i++){
						response[i].nacimiento = response[i].nacimiento.substring(0,10);
					}
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
		this.search_form.controls['nombres'].setValue("");
		this.search_form.controls['apellidos'].setValue("");
		this.search_form.controls['nacimiento'].setValue("");
		this.search_form.controls['departamento'].setValue("");
	}

	do_add(){
		if(	this.add_form.valid && 
			this.validate_trim(this.add_form.controls['nombres'].value) && 
			this.validate_trim(this.add_form.controls['apellidos'].value) && 
			this.validate_fecha_nacimiento()){
			this.loading_add = true;
			var load = {
		        nombres:this.add_form.controls['nombres'].value, 
		        apellidos:this.add_form.controls['apellidos'].value, 
		        nacimiento: this.add_form.controls['nacimiento'].value,
		        departamento: this.add_form.controls['departamento'].value
		    };
		    var response;
			this.service.post_alumnos(load).subscribe(
		        data => response = data[0],
		        err => {console.log(err);this.internalServerError();this.loading_add = false;},
		        ()=> {
		            if(response && response!=-1){
		              	this.clean_add();
	        			this.agregar_modal.hide();
		              	this.do_search();
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
		this.add_form.controls['nombres'].setValue("");
		this.add_form.controls['apellidos'].setValue("");
		this.add_form.controls['nacimiento'].setValue("");
		this.add_form.controls['nacimiento_temporal_reference'].setValue("");
		this.add_form.controls['departamento'].setValue("");
		this.submit_add = false;
	}

	do_edit(){
    	if(	this.editar_form.valid && 
			this.validate_trim(this.editar_form.controls['nombres'].value) && 
			this.validate_trim(this.editar_form.controls['apellidos'].value) && 
			this.validate_fecha_nacimiento_edit()){
			this.loading_edit = true;
			var load = {
				codigo:this.editar_form.controls['codigo'].value, 
		        nombres:this.editar_form.controls['nombres'].value, 
		        apellidos:this.editar_form.controls['apellidos'].value, 
		        nacimiento: this.editar_form.controls['nacimiento'].value,
		        departamento: this.editar_form.controls['departamento'].value
		    };
		    var response;
			this.service.update_alumnos(load).subscribe(
		        data => response = data,
		        err => {console.log(err);this.internalServerError();this.loading_edit = false;},
		        ()=> {
		            if(response && response!=-1){
	        			this.editar_modal.hide();
		              	this.do_search();
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

	open_edit(alumno){
		this.submit_edit = false;
		this.loading_edit = false;
    	this.editar_modal.show();
    	this.editar_form.controls['codigo'].setValue(alumno.codigo);
    	this.editar_form.controls['nombres'].setValue(alumno.nombres);
		this.editar_form.controls['apellidos'].setValue(alumno.apellidos);
		this.editar_form.controls['nacimiento'].setValue(alumno.nacimiento);
		this.editar_form.controls['nacimiento_temporal_reference'].setValue(alumno.nacimiento);
		this.editar_form.controls['departamento'].setValue(alumno.departamento);
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

    delete_alumno(alumno){
    	swal({
		    title: '<i class="fa  fa-warning text-warning"></i> <span class="swal-title">Eliminar</span>',
		    html: "<span class='swal-text'>¿Está seguro que desea eliminar el alumno?</span>",
		    width:"400px",
		    showCancelButton: true,
		    confirmButtonColor: '#D32C53',
		    cancelButtonColor: '#57889c',
		    confirmButtonText: 'Sí, Eliminar',
		    cancelButtonText: 'No'
		}).then((result) => {
		    if (result.value) {
		    	var response;
		    	this.service.delete_alumnos(alumno.codigo).subscribe(
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

    open_view(alumno){
    	this.ver_form.controls['codigo'].setValue(alumno.codigo);
    	this.ver_form.controls['hash'].setValue(alumno.hash);
    	this.ver_form.controls['nombres'].setValue(alumno.nombres);
    	this.ver_form.controls['apellidos'].setValue(alumno.apellidos);
    	this.ver_form.controls['nacimiento'].setValue(alumno.nacimiento);
    	this.ver_form.controls['departamento'].setValue(alumno.departamento);
    	var pdf = pdfMake;

    	var docDefinition = {
            info: {
                title: 'Ficha de Alumno',
                author: 'Ficha',
                subject: 'Ficha',
                keywords: 'Ficha',
                creator: 'Ficha',
                producer: 'Ficha'
            },
            pageSize: 'LETTER',
            pageOrientation: 'portrait',
            content: [
            	{text: "Ficha de Perfil de Alumno", style:'header', margin: [0,10,0,10]},
            	{
                    style: 'table',
                    margin: [0,10,0,10],
                    table: {
                        headerRows: 1,
                        widths: ['*', '*', '*', '*'],
                        body: [
                            [
                            {text: 'Código', style: 'table_header'}, 
                            {text: 'Hash Secreto', style: 'table_header'}, 
                            {text: 'Nacimiento', style: 'table_header'},
                            {text: 'Departamento', style: 'table_header'}
                            ],
                            [alumno.codigo, alumno.hash, alumno.nacimiento, alumno.departamento]
                        ]
                    },
                    layout: {
                        fillColor: function (i, node) { return (i === 0) ?  '#E9E9E9' : null; }
                    }
                },
                {
                    style: 'table',
                    margin: [0,10,0,10],
                    table: {
                        headerRows: 1,
                        widths: ['*', '*'],
                        body: [
                            [
                            {text: 'Nombres', style: 'table_header'}, 
                            {text: 'Apellidos', style: 'table_header'}
                            ],
                            [alumno.nombres, alumno.apellidos]
                        ]
                    },
                    layout: {
                        fillColor: function (i, node) { return (i === 0) ?  '#E9E9E9' : null; }
                    }
                },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center'
                },
                table_header: {
                	fontSize: 14,
                    bold: true,
                    alignment: 'center'
                },
                table:{
                	fontSize: 12,
                	alignment: 'center'
                }
            }
        }
        pdf.createPdf(docDefinition).getDataUrl(function (outDoc) {
               document.getElementById('pdf_frame').setAttribute('src',outDoc);
        });
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
          	text: "Alumno agregado de forma exitosa.",
          	confirmButtonText: '<i class="fa fa-thumbs-up"></i> Ver Código Secreto',
          	allowOutsideClick: false,
          	type: "success"
      	}).then(()=>{
         	swal({
          		title: hash,
          		text: "Guarde el código secreto para poder crear el usuario",
          		confirmButtonText: '<i class="fa fa-thumbs-up"></i> Regresar',
          		allowOutsideClick: false,
          		type: "info"
        	}).then(()=>{
        	})
      	}).catch(swal.noop)
  	}

  	editar_success() {
      	swal({
          	title: "Editado Exitosamente",
          	text: "Alumno editado de forma exitosa.",
          	confirmButtonText: '<i class="fa fa-thumbs-up"></i> Genial!',
          	allowOutsideClick: false,
          	type: "success"
      	}).catch(swal.noop)
  	}

  	delete_success() {
      	swal({
          	title: "Eliminado Exitosamente",
          	text: "Alumno eliminado de forma exitosa.",
          	confirmButtonText: '<i class="fa fa-thumbs-up"></i> Genial!',
          	allowOutsideClick: false,
          	type: "success"
      	}).catch(swal.noop)
  	}

}