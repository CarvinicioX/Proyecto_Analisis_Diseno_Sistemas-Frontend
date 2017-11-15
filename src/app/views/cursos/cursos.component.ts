import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { AdminCursosService } from '../cursos/cursos.service';

@Component({
  selector: 'cursos',
  templateUrl: 'cursos.template.html'
})


export class CursosComponent implements OnInit{

  public cursos:any;
  public temp_cursos:any;

  constructor(private router:Router, private service:AdminCursosService){
    this.cursos = [];
    this.temp_cursos = [];
  }

	ngOnInit() {
    this.getCursos();
  }

  getCursos() {
		var response;
		this.service.get_cursos(sessionStorage.getItem("logininfo")).subscribe(
			//store response
			data => response = data,
			err => console.log(err),
			()=> {
				if(response && response != -1){//if not null
					this.cursos = response;
					this.temp_cursos = response;
				}else{
					this.cursos = [];
					this.temp_cursos = [];
				}
			   
			}
		);
  };
}