import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';
import { AdminAlumnosService } from '../admin_alumnos.service';

@Component({
  selector: 'buscar_alumnos',
  templateUrl: 'buscar_alumnos.template.html'
})


export class BuscarAlumnosComponent implements OnInit{

	constructor(private router:Router, private service:AdminAlumnosService){
	}

	ngOnInit() {
    }


}