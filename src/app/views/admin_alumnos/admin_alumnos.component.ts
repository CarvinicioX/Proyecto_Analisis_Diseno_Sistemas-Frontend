import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';

@Component({
  selector: 'admin_alumnos',
  templateUrl: 'admin_alumnos.template.html'
})


export class AdminAlumnosComponent implements OnInit{

	constructor(private router:Router){
	}

	ngOnInit() {
    }


}