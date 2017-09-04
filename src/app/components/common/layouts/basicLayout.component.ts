//Native Imports
import { Component } from '@angular/core';

//Third party libraries imports
import { detectBody } from '../../../app.helpers';
declare var jQuery:any;

@Component({
  selector: 'basic',
  templateUrl: 'basicLayout.template.html',
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class BasicLayoutComponent {


  public ngOnInit():any {
    //Check if body size needs size fix
    detectBody();
  }

  //onResize()
  public onResize(){
    //Check if body size needs size fix
    detectBody();
  }

}
