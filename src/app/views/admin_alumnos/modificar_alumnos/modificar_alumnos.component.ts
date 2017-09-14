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

	constructor(private router:Router, private service:AdminAlumnosService){
	}

	ngOnInit() {
    }


}