import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { default as swal } from 'sweetalert2';

@Component({
  selector: 'new_request',
  templateUrl: 'new_request.template.html'
})


export class NewRequestComponent implements OnInit{

	constructor(private router:Router){
	}

	ngOnInit() {
    }


}