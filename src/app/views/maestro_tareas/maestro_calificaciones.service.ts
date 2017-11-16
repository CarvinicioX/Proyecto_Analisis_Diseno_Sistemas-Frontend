//Native imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers , RequestOptions} from '@angular/http';

//Third Party Imports
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CalificacionesTareasService {
  //LoginService Constructor: Http reference
  constructor(private http: Http) {}

  //Port where the backend server is  running
  private baseUrl: string = "https://analisisbackend.herokuapp.com";

  insert_calificacion(payload: any):Observable<any>{
      let bodyString = JSON.stringify(payload);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(this.baseUrl+"/insert_calificacion",bodyString, options).map(this.extractData).catch(this.handleError);
  }

  update_calificacion(payload: any):Observable<any>{
      let bodyString = JSON.stringify(payload);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(this.baseUrl+"/update_calificacion",bodyString, options).map(this.extractData).catch(this.handleError);
  }

  delete_calificacion(payload: any):Observable<any>{
      let bodyString = JSON.stringify(payload);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(this.baseUrl+"/delete_calificacion",bodyString, options).map(this.extractData).catch(this.handleError);
  }

  get_calificaciones():Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.baseUrl+"/get_calificaciones", options).map(this.extractData).catch(this.handleError);
}

  //Extract data as Json object
  private extractData(res:Response) {
    let body = res.json();
    return body || [];
  }

  //Handle and print error
  private handleError(error:any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}