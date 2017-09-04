//Native imports
import { Component } from '@angular/core';
import {Router} from '@angular/router';

//Third party libraries imports
import 'jquery-slimscroll';
declare var jQuery:any;

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.template.html'
})

export class NavigationComponent {
  //Component Variables
  
  constructor(private router: Router) {

  }

  ngAfterViewInit() {
    //get side-menu id reference
    jQuery('#side-menu').metisMenu();
    if (jQuery("body").hasClass('fixed-sidebar')) {
      //collapse sidebar if body has fixed-sidebar class
      jQuery('.sidebar-collapse').slimscroll({
        height: '100%'
      })
    }
  }

  //activeRoyute(string): get true if route is active
  activeRoute(routename: string): boolean{
    return this.router.url.indexOf(routename) > -1;
  }


}
