import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';

@Component({
  selector: 'admin_maestros',
  templateUrl: 'admin_maestros.template.html'
})


export class AdminMaestrosComponent implements OnInit{

	constructor(private router:Router){
	}

	ngOnInit() {
    }


}