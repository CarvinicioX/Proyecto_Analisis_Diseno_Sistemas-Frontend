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
export class HomeService {

    //HomeService Constructor: Http reference
	constructor(private http: Http) {}

    //Port where the backend server is  running
  	private baseUrl: string = "http://xteambackend-env.us-west-1.elasticbeanstalk.com";

    //read_notification function
    read_notification(payload: any):Observable<any>{
        let bodyString = JSON.stringify(payload);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl+"/read_notification",bodyString, options).map(this.extractData).catch(this.handleError);
    }

    //get_notifications function
    get_notifications(payload: any):Observable<any>{
        let bodyString = JSON.stringify(payload);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl+"/get_notifications",bodyString, options).map(this.extractData).catch(this.handleError);
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
        console.log(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}