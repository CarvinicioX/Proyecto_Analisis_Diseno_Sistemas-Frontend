//Native imports
import { Component } from '@angular/core';
import { Router } from '@angular/router';

//Third party libraries imports
import { smoothlyMenu } from '../../../app.helpers';
declare var jQuery:any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html'
})

export class TopNavbarComponent {

  	//TopNavbarComponent Constructor, Router reference
	constructor(private router:Router){
	}	

	//toggleNavigation(): resize to the mini-navbar class
	toggleNavigation(): void {
    	jQuery("body").toggleClass("mini-navbar");
    	smoothlyMenu();
	}

	//logout(): clear sessionstorage
	logout = function(){
		this.router.navigateByUrl('/login');
	}

}
