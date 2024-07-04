import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, find, map, Observable } from 'rxjs';
import { ApiRoutes } from '../enum';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
   constructor(private _http: HttpClient) { }

  getAllCoupons():Observable<any>{
  return this._http.get<any>(`${ApiRoutes.coupon}`)
  } 
  checkCouponExists(couponTitle: string): Observable<any> {
    return this._http.get<any[]>(`${ApiRoutes.coupon}`).pipe(
      map((items: any) => items.find((element: any) => element.name === couponTitle))
    );
  }
  
  
}
