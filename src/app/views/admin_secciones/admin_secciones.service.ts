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
export class AdminSeccionesService {
  //LoginService Constructor: Http reference
  constructor(private http: Http) {}

  //Port where the backend server is  running
  private baseUrl: string = "http://DESKTOP-P8O5UJ2:8000";

 get_listado_alumnos_seccion():Observable<any>{
      let params = new URLSearchParams();
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers});
      return this.http.get(this.baseUrl+"/get_alumnos_seccion", options).map(this.extractData).catch(this.handleError);
  }

  get_listado_alumnos():Observable<any>{
      let params = new URLSearchParams();
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers});
      return this.http.get(this.baseUrl+"/get_listado_alumnos", options).map(this.extractData).catch(this.handleError);
  }

  get_listado_clases():Observable<any>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers});
      return this.http.get(this.baseUrl+"/get_listado_clases", options).map(this.extractData).catch(this.handleError);
  }

  get_listado_maestros():Observable<any>{
      let params = new URLSearchParams();
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers});
      return this.http.get(this.baseUrl+"/get_listado_maestros", options).map(this.extractData).catch(this.handleError);
  }

  get_listado_grados():Observable<any>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers});
      return this.http.get(this.baseUrl+"/get_listado_grados", options).map(this.extractData).catch(this.handleError);
  }

  get_listado_secciones():Observable<any>{
      let params = new URLSearchParams();
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers});
      return this.http.get(this.baseUrl+"/get_listado_secciones", options).map(this.extractData).catch(this.handleError);
  }

  get_secciones(load):Observable<any>{
      let params = new URLSearchParams();
      params.set('codigo', load.codigo);
      params.set('grado', load.grado);
      params.set('maestro', load.maestro);
      params.set('clase', load.clase);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers, search: params });
      return this.http.get(this.baseUrl+"/get_secciones", options).map(this.extractData).catch(this.handleError);
  }

  post_secciones(load):Observable<any>{
      let bodyString = JSON.stringify(load);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(this.baseUrl+"/insert_seccion", bodyString, options).map(this.extractData).catch(this.handleError);
  }

  update_secciones(load):Observable<any>{
      let bodyString = JSON.stringify(load);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.put(this.baseUrl+"/update_seccion", bodyString, options).map(this.extractData).catch(this.handleError);
  }

  delete_secciones(load):Observable<any>{
     let params = new URLSearchParams();
      params.set('codigo', load);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers, search: params });
      return this.http.delete(this.baseUrl+"/delete_seccion", options).map(this.extractData).catch(this.handleError);
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