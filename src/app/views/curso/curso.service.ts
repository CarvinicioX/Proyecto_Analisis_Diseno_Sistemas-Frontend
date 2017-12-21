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
export class CursoService {
  //LoginService Constructor: Http reference
  constructor(private http: Http) {}

  //Port where the backend server is  running
  private baseUrl: string = "http://DESKTOP-P8O5UJ2:8000";

  get_curso(load):Observable<any>{
      let params = new URLSearchParams();
      params.set('codigo', load);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers, search: params });
      return this.http.get(this.baseUrl+"/get_curso", options).map(this.extractData).catch(this.handleError);
  }

  get_tarea_curso(load):Observable<any>{
      let params = new URLSearchParams();
      params.set('codigo_seccion', load);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers, search: params });
      return this.http.get(this.baseUrl+"/get_tareas_curso", options).map(this.extractData).catch(this.handleError);
  }


  get_calificaciones(load):Observable<any>{
      let params = new URLSearchParams();
      params.set('codigo', load.codigo);
      params.set('codigo_tarea', load.codigo_tarea);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers, search: params });
      return this.http.get(this.baseUrl+"/calificaciones", options).map(this.extractData).catch(this.handleError);
  }

  insert_tarea(payload: any):Observable<any>{
      let bodyString = JSON.stringify(payload);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(this.baseUrl+"/insert_tarea",bodyString, options).map(this.extractData).catch(this.handleError);
  }

  calificar(payload: any):Observable<any>{
      let bodyString = JSON.stringify(payload);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(this.baseUrl+"/calificar",bodyString, options).map(this.extractData).catch(this.handleError);
  }

  update_tarea(load):Observable<any>{
      let bodyString = JSON.stringify(load);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.put(this.baseUrl+"/update_tarea", bodyString, options).map(this.extractData).catch(this.handleError);
  }

  delete_tarea(load):Observable<any>{
     let params = new URLSearchParams();
      params.set('codigo', load);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers, search: params });
      return this.http.delete(this.baseUrl+"/delete_tarea", options).map(this.extractData).catch(this.handleError);
  }

  get_alumnos_curso(load):Observable<any>{
      let params = new URLSearchParams();
      params.set('codigo', load);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers, search: params });
      return this.http.get(this.baseUrl+"/get_listado_alumnos_curso", options).map(this.extractData).catch(this.handleError);
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