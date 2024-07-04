import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../enum';

@Injectable({providedIn: 'root'})
export class productService {
    constructor(private _http : HttpClient) { }
 getAllProducts():Observable<any>{ 
    return this._http.get<any>(`${ApiRoutes.product}`)
}

}