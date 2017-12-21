import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import {CursosService} from './cursos.service';

@Component({
  selector: 'cursos',
  templateUrl: 'cursos.template.html'
})


export class CursosComponent implements OnInit{

	public cursos:any[];
	constructor(private router:Router, private service:CursosService){
		this.cursos = [];
	}

	ngOnInit() {
		this.get_cursos();
    }

    get_codigo_maestro(){
    	var login = JSON.parse(sessionStorage.getItem('loginInfo'));
    	return login.codigo;
    }

    get_cursos(){
    	var response;
    	this.service.get_cursos(this.get_codigo_maestro()).subscribe(
	        data => response = data,
	        err => {console.log(err);},
	        ()=> {
	            if(response && response!=-1){
	              	this.cursos = response;
	            }else{
	            }
	        }
	    );
    }


}