//Native imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers , RequestOptions, URLSearchParams} from '@angular/http';

//Third Party Imports
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AdminMaestrosService {
  //LoginService Constructor: Http reference
  constructor(private http: Http) {}

  //Port where the backend server is  running
  private baseUrl: string = "http://DESKTOP-P8O5UJ2:8000";

  get_listado_maestros():Observable<any>{
      let params = new URLSearchParams();
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers});
      return this.http.get(this.baseUrl+"/get_listado_maestros", options).map(this.extractData).catch(this.handleError);
  }

  get_maestros(load):Observable<any>{
      let params = new URLSearchParams();
      params.set('codigo', load.codigo);
      params.set('nombre', load.nombre);
      params.set('direccion', load.direccion);
      params.set('telefono', load.telefono);
      params.set('email', load.email);
      params.set('nacimiento', load.nacimiento);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers, search: params });
      return this.http.get(this.baseUrl+"/get_maestros", options).map(this.extractData).catch(this.handleError);
  }

  post_maestros(load):Observable<any>{
      let bodyString = JSON.stringify(load);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(this.baseUrl+"/insert_maestro", bodyString, options).map(this.extractData).catch(this.handleError);
  }

  update_maestros(load):Observable<any>{
      let bodyString = JSON.stringify(load);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.put(this.baseUrl+"/update_maestro", bodyString, options).map(this.extractData).catch(this.handleError);
  }

  delete_maestros(load):Observable<any>{
     let params = new URLSearchParams();
      params.set('codigo', load);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers, search: params });
      return this.http.delete(this.baseUrl+"/delete_maestro", options).map(this.extractData).catch(this.handleError);
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