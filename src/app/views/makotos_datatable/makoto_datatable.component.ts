//#######################################
//#          MODULO DATATABLES          #
//#                                     #
//# DESCRIPCION: MODULO QUE PERMITE IMP-#
//# LEMENTAR LA FUNCIONALIDAD DE DATATA-#
//# BLES EN CUALQUIER ARREGLO DE OBJETO-#
//# S. EL MISMO GENERA 3 EVENTOS PARA G-#
//# ESTIONAR EL EDIT, DELETE, Y VIEW DE-#
//# SDE EL MODULO PADRE.                #
//#                                     #
//# VERSION: 1.0.0                      #  
//# AUTOR: MAKOTO 11/25/2017            #
//#######################################


//##########################
//# INICIO # IMPORTACIONES #

import {Component, OnInit, ViewChild, Input, Output, AfterViewInit, IterableDiffers, DoCheck, EventEmitter } from '@angular/core';

//# INICIO # IMPORTACIONES #
//##########################


//#################################################
//# INICIO # DECLARACION COMPONENTE DE DATATABLES #

@Component({
  selector: 'makoto-datatable',
  templateUrl: './makoto_datatable.template.html',
  styleUrls: ['./makoto_datatable.style.css']
})

//# FINAL  # DECLARACION COMPONENTE DE DATATABLES #
//#################################################



//#################################
//# INICIO # MODULO DE DATATABLES #

export class DatatableComponent implements OnInit, DoCheck {
  //###################
  //# INICIO # INPUTS #

  //# options: Controla los cambios dentro del INPUT de options. Cuando hay un cambio asigna el valor del offsetView y actualiza los offsets de paginación
  @Input() set options(option: any) {
    this.options_value = option;
    this.offsetView = this.options_value.navigation_offsets[this.options_value.navigation_starting_offset_index];
    this.update_offsets();
  }

  //# loading: Referencia a la variable que controla el spinner de carga (se pasa del componente padre por referencia)
  @Input() loading:any;

  //# data_array: Arreglo de objetos a utilizar en la tabla. Es enviado por el component padre
  @Input() data_array:any[];
  
  //# FINAL  # INPUTS #
  //###################

  //####################
  //# INICIO # EVENTOS #

  //# delete: Transmite un evento de tipo DELETE al padre cuando se llama la función de borrar en un registro de la tabla
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  //# view: Transmite un evento de tipo VIEW al padre cuando se llama la función de ver en un registro de la tabla
  @Output() view: EventEmitter<number> = new EventEmitter<number>();

  //# edit: Transmite un evento de tipo EDIT al padre cuando se llama la función de editar en un registro de la tabla
  @Output() edit: EventEmitter<number> = new EventEmitter<number>();
  
  //# edit: Transmite un evento de tipo EDIT al padre cuando se llama la función de editar en un registro de la tabla
  @Output() add: EventEmitter<number> = new EventEmitter<number>();

  //# FINAL  # EVENTOS #
  //####################


  //######################
  //# INICIO # VARIABLES #

  //# options_value: Almacena la referencia al objeto de options pasado por el componente padre
  public options_value:any;

  //# order: Almacena la columna que se está ordenando (se cambia cuando el usuario da clic en otra columna para ordenar)
	public order:string;

  //# ascendent: Almacena si la columna se está ordenando de forma ascendente. En caso de ser falsa, la columna se ordena de forma descendiente
  public ascendent:boolean;

  //# requestOffsetRight: Almacena una referencia del límite derecho del sistema de paginación
  public requestOffsetRight:number;

  //# requestOffsetLeft: Almacena una referencia del límite izquierdo del sistema de paginación
  public requestOffsetLeft:number;

  //# offsetView: Almacena el total de registros a mostrar por cada paginación de la tabla
  public offsetView:number;

  //# displaying: Almacena una referencia del total de elementos mostrados (se utiliza para un ngFor en el template, que se encarga de mostrar los registros)
  public displaying:string[];

  //# resultados: Almacena el arreglo de objetos referenciado por el component padre
  public resultados:any[];

  //# static_resultados: Almacena una referencia estática del arreglo de objetos referenciado por el padre
  public static_resultados:any[];

  //# search_word: Almacena la palabra ingresa en el campo de filtro
  public search_word:string;

  //# filtering: Almacena el estado de filtro. Si existe un filtro aplicado, la variable es TRUE
  public filtering:boolean;

  //# pag_reference: Almacena una referencia del total de botones de paginación (se utiliza para un ngFor en el template, que se encarga de mostrar los botones de paginación)
  public pag_reference:string[];

  //# differ: Variable de referencia utilizada para detectar cambios en un arreglo (Sólo funciona para variables pasadas por referencia)
  private differ: any;

  //# FINAL  # VARIABLES #
	//######################


  //########################
  //# INICIO # CONSTRUCTOR #

  constructor(private _iterableDiffers: IterableDiffers) {
    this.offsetView = 0;
    this.order = "";
    this.ascendent = false;
    this.filtering = false;
    this.requestOffsetRight = 0;
    this.requestOffsetLeft = 0;
    this.displaying = [];
    this.search_word = "";
    this.resultados = [];
    this.differ = this._iterableDiffers.find([]).create(null);
    this.pag_reference = [];
  }

  //# FINAL  # CONSTRUCTOR #
  //########################


  //###################
  //# INICIO # LOGICA #
 
  //# ngOnInit(): Método que ejecuta la lógica en el ciclo de inicio de Angular
  ngOnInit() {}

  //# AfterViewInit(): Método que ejecuta la lógica en el ciclo posterior al inicio de Angular
  AfterViewInit(){
    this.resultados = this.data_array;
    this.pag_reference = [];
    for(var i = 0;i<this.resultados.length/this.offsetView;i++){
      this.pag_reference.push(' ');
    }
    this.update_offsets();
  }

  //# ngDoCheck(): Método que ejecuta la lógica en el ciclo de cambios de Angular. El mismo verifica si el arreglo de datos ha cambiado y actualiza las variables correspondientes en caso de haberlo hecho
  ngDoCheck() {
    let changes = this.differ.diff(this.data_array);
    if (changes) {
      this.resultados = this.data_array;
      this.update_offsets();
      this.pag_reference = [];
      for(var i = 0;i<this.resultados.length/this.offsetView;i++){
        this.pag_reference.push(' ');
      }
    }
  }
 
  //# onChangeSelection(selected): Método que recibe el total de registros a mostrar por paginación, los asigna a la variable correspondiente, y actualiza el arreglo de referencia para el ngFor
  onChangeSelection(selected){
    this.offsetView = parseInt(selected);
    this.pag_reference = [];
    for(var i = 0;i<this.resultados.length/this.offsetView;i++){
      this.pag_reference.push(' ');
    }
  }

  

  //# delete_event(index): Método que ejecuta el evento de DELETE.
  delete_event(index){

    this.delete.emit(this.data_array[index]);
  }

  //# view_event(index): Método que ejecuta el evento de VIEW.
  view_event(index){

    this.view.emit(this.data_array[index]);
  }

  //# edit_event(index): Método que ejecuta el evento de EDIT.
  edit_event(index){

    this.edit.emit(this.data_array[index]);
  }

  //# edit_event(index): Método que ejecuta el evento de EDIT.
  add_event(index){

    this.add.emit(this.data_array[index]);
  }

  //# filter_search(): Método que filtra la tabla en base al STRING ingresado en el campo de búsqueda
  filter_search(){
    var temp_results = [];
    if(this.search_word && this.search_word!=null && this.search_word !=""){
      for(var i =0;i<this.data_array.length;i++){
        for(var j =0;j<this.options_value.columns.length;j++){
          if(this.data_array[i][this.options_value.columns[j]].toString().toLowerCase().includes(this.search_word.toLowerCase().trim())){
            temp_results.push(this.data_array[i]);
            break;
          }
        }
      }
      this.filtering = true;
      this.resultados = temp_results;
      this.update_offsets();
      this.pag_reference = [];
      for(var i = 0;i<this.resultados.length/this.offsetView;i++){
        this.pag_reference.push(' ');
      }
    }else{
      this.filtering = false;
      this.resultados = this.data_array;
      this.update_offsets();
      this.pag_reference = [];
      for(var i = 0;i<this.resultados.length/this.offsetView;i++){
        this.pag_reference.push(' ');
      }
    }
  }

  //# update_offsets(): Método que actualiza los offset de referencia de paginación y el arreglo de referencia de paginación
  update_offsets(){
    this.requestOffsetRight = 0;
    this.requestOffsetLeft = 0;
    if(this.resultados.length > 0){
      if(this.resultados.length < this.offsetView){
        this.requestOffsetRight = this.resultados.length;
      }else{
        this.requestOffsetRight = this.offsetView;
      }
      this.requestOffsetLeft = 1;
      this.displaying = [];
      for(var i = this.requestOffsetLeft-1; i < this.requestOffsetRight; i++){
        this.displaying.push(" ");
      }
    }else{
      this.displaying = [];
      this.requestOffsetRight = 0;
      this.requestOffsetLeft = 0;
    }
  }

  //# updateRequestsGoRight(): Método que actualiza los offset de referencia de paginación y el arreglo de referencia de paginación cuando el usuario da clic en la flecha derecha
	updateRequestsGoRight(){
      if(this.resultados.length > 0){
          if(this.resultados.length< this.requestOffsetRight+this.offsetView){
              this.requestOffsetRight = this.resultados.length;
          }else{
              this.requestOffsetRight = this.requestOffsetRight + this.offsetView;

          }
          this.requestOffsetLeft = this.requestOffsetLeft + this.offsetView;
          this.displaying = [];
          for(var i = this.requestOffsetLeft-1; i < this.requestOffsetRight; i++){
          	this.displaying.push(" ");
          }
      }else{
        this.displaying = [];
      }
  }

  //# updateRequestsGoLeft(): Método que actualiza los offset de referencia de paginación y el arreglo de referencia de paginación cuando el usuario da clic en la flecha izquierda
  updateRequestsGoLeft(){
      if(this.resultados.length > 0){
        if(this.resultados.length == this.requestOffsetRight){
            this.requestOffsetLeft = this.requestOffsetLeft - this.offsetView;
            this.requestOffsetRight = this.requestOffsetLeft + this.offsetView - 1;
        }else{
            this.requestOffsetLeft = this.requestOffsetLeft - this.offsetView;
            this.requestOffsetRight = this.requestOffsetRight - this.offsetView;
        }
        this.displaying = [];
        for(var i = this.requestOffsetLeft-1; i < this.requestOffsetRight; i++){
        	this.displaying.push(" ");
        }
      }else{
        this.displaying = [];
      }
  }

  //# sort_column(index): Método que recibe el indice de la columna que se está filtrando. El mismo verifica si es ascendente, descendente, y el tipo de dato de la columna a filtrar (con el propósito de aplicar el filtro correspondiente)
  sort_column(index){
    if(this.order == this.options_value.columns[index] && this.ascendent == false){
      this.ascendent = true;
      if(this.options_value.columns_types[index]=="number"){
        this.resultados.sort((a, b)=>{
          var x = a[this.options_value.columns[index]];
          var y = b[this.options_value.columns[index]];
          if (x < y) {return 1;}
          if (x > y) {return -1;}
          return 0;
        });
      }else if(this.options_value.columns_types[index]=="text"){
        this.resultados.sort((a, b)=>{
          var x = a[this.options_value.columns[index]].toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
          var y = b[this.options_value.columns[index]].toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
          if (x < y) {return 1;}
          if (x > y) {return -1;}
          return 0;
        });
      }else if(this.options_value.columns_types[index]=="date"){
        this.resultados.sort((a, b)=>{
          var x = a[this.options_value.columns[index]];
          var y = b[this.options_value.columns[index]];
          if(y.length >= 16){
            var y_date = new Date(parseInt(y.substring(0,4)), parseInt(y.substring(5,7)) -1, parseInt(y.substring(8,10)));
          }else{
            var y_date = new Date(3000, 11, 31);
          }
          if(x.length >= 16){
            var x_date = new Date(parseInt(x.substring(0,4)), parseInt(x.substring(5,7)) -1, parseInt(x.substring(8,10)));
          }else{
            var x_date = new Date(3000, 11, 31);
          }
          if (x_date.getTime() < y_date.getTime()) {return 1;}
          if (x_date.getTime() > y_date.getTime()) {return -1;}
          return 0;
        });
      }
    }else if(this.order == this.options_value.columns[index] && this.ascendent == true){
      this.ascendent = false;
      if(this.options_value.columns_types[index]=="number"){
        this.resultados.sort((a, b)=>{
          var x = a[this.options_value.columns[index]];
          var y = b[this.options_value.columns[index]];
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });
      }else if(this.options_value.columns_types[index]=="text"){
        this.resultados.sort((a, b)=>{
          var x = a[this.options_value.columns[index]].toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
          var y = b[this.options_value.columns[index]].toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });
      }else if(this.options_value.columns_types[index]=="date"){
        this.resultados.sort((a, b)=>{
          var x = a[this.options_value.columns[index]];
          var y = b[this.options_value.columns[index]];
          if(y.length >= 16){
            var y_date = new Date(parseInt(y.substring(6,10)), parseInt(y.substring(0,2)) -1, parseInt(y.substring(3,5)), parseInt(y.substring(11,13)), parseInt(y.substring(14,16)));
          }else{
            var y_date = new Date(3000, 11, 31);
          }
          if(x.length >= 16){
            var x_date = new Date(parseInt(x.substring(6,10)), parseInt(x.substring(0,2)) -1, parseInt(x.substring(3,5)), parseInt(x.substring(11,13)), parseInt(x.substring(14,16)));
          }else{
            var x_date = new Date(3000, 11, 31);
          }
          if (x_date.getTime() < y_date.getTime()) {return -1;}
          if (x_date.getTime() > y_date.getTime()) {return 1;}
          return 0;
        });
      }
    }else{
      this.order = this.options_value.columns[index];
      this.ascendent = false;
      if(this.options_value.columns_types[index]=="number"){
        this.resultados.sort((a, b)=>{
          var x = a[this.options_value.columns[index]];
          var y = b[this.options_value.columns[index]];
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });
      }else if(this.options_value.columns_types[index]=="text"){
        this.resultados.sort((a, b)=>{
          var x = a[this.options_value.columns[index]].toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
          var y = b[this.options_value.columns[index]].toLowerCase().replace("\"","").replace(".","").replace("  "," ").trim();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });
      }else if(this.options_value.columns_types[index]=="date"){
        this.resultados.sort((a, b)=>{
          var x = a[this.options_value.columns[index]];
          var y = b[this.options_value.columns[index]];
          if(y.length >= 16){
            var y_date = new Date(parseInt(y.substring(6,10)), parseInt(y.substring(0,2)) -1, parseInt(y.substring(3,5)), parseInt(y.substring(11,13)), parseInt(y.substring(14,16)));
          }else{
            var y_date = new Date(3000, 11, 31);
          }
          if(x.length >= 16){
            var x_date = new Date(parseInt(x.substring(6,10)), parseInt(x.substring(0,2)) -1, parseInt(x.substring(3,5)), parseInt(x.substring(11,13)), parseInt(x.substring(14,16)));
          }else{
            var x_date = new Date(3000, 11, 31);
          }
          if (x_date.getTime() < y_date.getTime()) {return -1;}
          if (x_date.getTime() > y_date.getTime()) {return 1;}
          return 0;
        });
      }
    }
  }

  //# pagination_navigation(value): Método que cambia de paginación cuando el usuario da clic en un botón de paginación
  pagination_navigation(value){
    this.requestOffsetLeft = (this.offsetView * (value-1)) + 1;
    if(this.offsetView * value > this.resultados.length){
      this.requestOffsetRight = this.resultados.length;
    }else{
      this.requestOffsetRight = this.offsetView * value;
    }
    this.displaying = [];
    for(var i = this.requestOffsetLeft-1; i < this.requestOffsetRight; i++){
      this.displaying.push(" ");
    }
  }

  //# nav_current_value(): Método que retorna el valor actual de paginación
  nav_current_value(){

    return Math.ceil(this.requestOffsetRight/this.offsetView);
  }

  //# nav_show(index): Método que retorna la validez de un índice de paginación. En caso de ser inválido, el template no lo muestra
  nav_show(index){
    if(this.nav_max_value()>=index && (((this.nav_current_value() - 3)<=index && index<=(this.nav_current_value() +3))) || 
      (this.nav_current_value()<=this.nav_min_value() + 2 && index<=this.nav_min_value()+6) ||
      (this.nav_current_value()>=this.nav_max_value() - 2 && index>=this.nav_max_value()-6)){
      return true;
    }else{
      return false;
    }
  }

  //# nav_min_value(): Retorna el valor mínimo posible de paginación
  nav_min_value(){

    return 1;
  }

  //# nav_max_value(): Retorna el valor máximo posible de paginación
  nav_max_value(){

    return Math.ceil(this.resultados.length/this.offsetView);
  }

  //# FINAL  # LOGICA #
  //###################
}

//# FINAL  # MODULO DE DATATABLES #
//#################################