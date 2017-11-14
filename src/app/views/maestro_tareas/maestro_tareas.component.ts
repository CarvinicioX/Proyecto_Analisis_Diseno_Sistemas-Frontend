import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { default as swal } from 'sweetalert2';

@Component({
  selector: 'maestro_tareas',
  templateUrl: 'maestro_tareas.template.html'
})


export class MaestroTareasComponent implements OnInit{
  public id:number;
  public sub:any;
	constructor(private router:Router, private Router:ActivatedRoute){
   
    
	}

	ngOnInit() {
    this.sub= this.Router.params.subscribe(params => {
      this.id=params['id']; 
    //   console.log(this.Router.params);
    console.log('dfasdfasfdafdasfadfads')
      console.log(params);
   });

    }
  getid(){
    
  
    
  }

}