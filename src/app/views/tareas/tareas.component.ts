import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';

@Component({
  selector: 'tareas',
  templateUrl: 'tareas.template.html'
})


export class TareasComponent implements OnInit{

	constructor(private router:Router){
	}

	ngOnInit() {
    }


}