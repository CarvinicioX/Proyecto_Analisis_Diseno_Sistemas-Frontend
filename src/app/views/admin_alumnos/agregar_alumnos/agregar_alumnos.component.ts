import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { AdminAlumnosService } from '../admin_alumnos.service';

@Component({
  selector: 'agregar_alumnos',
  templateUrl: 'agregar_alumnos.template.html'
})


export class AgregarAlumnosComponent implements OnInit{

	private agregar_alumnos_form:FormGroup;
	private submit_add:boolean;
	constructor(form_builder: FormBuilder, private router:Router, private service:AdminAlumnosService){
		this.submit_add = false;
		this.agregar_alumnos_form = form_builder.group({
            'nombres' : ["", Validators.required],
            'apellidos' : ["", Validators.required],
            'nacimiento' : ["", Validators.required],
            'departamento' : ["", Validators.required],
            'id' : [{value: "", disabled: true}, ]
        })
	}

	ngOnInit() {
    }


}