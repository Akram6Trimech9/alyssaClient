import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
 import { AuthStoreService } from './auth-store.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { CredentialsInterface, LoginInterface } from 'src/app/interfaces';
import { ApiRoutes, LocalStorage } from 'src/app/enum';
import { UserInterface } from 'src/app/interfaces/user';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient , private _authStore: AuthStoreService) { }

  helper = new JwtHelperService();
  
 
  login(payload : LoginInterface) : Observable<CredentialsInterface>{
    return  this._http.post<CredentialsInterface>(ApiRoutes.login, payload)
    .pipe(
      map( (credentials: CredentialsInterface) => { 
        this._authStore.login(credentials)
         return credentials ; 
      })
    )
  }


  logout() :Observable<void>{
    return    this._http.get(ApiRoutes.logout , {}).pipe(
       map(()=>{                
           this._authStore.logout()
       })
    )
  }

  signUp(user : UserInterface):Observable<any>{ 
    return this._http.post<any>(`${ApiRoutes.users}/signup`,user)
  }
  getUserInfo(): Observable<UserInterface> {
    let token:any=localStorage.getItem(LocalStorage.AccessToken)
    let decodeToken=this.helper.decodeToken(token)
     const id = decodeToken?.id
    return this._http.get<UserInterface>(`${ApiRoutes.userInfo}/${id}`).pipe(
      map((user: UserInterface) => {
        this._authStore.setUserInfo(user);
        return user;
      })
    );
  }

  activateAccount(token : any ) :Observable<any>{ 
    return this._http.put<any>(`${ApiRoutes.users}/emailValidation`,token)
    // .pipe(
    //   map( (credentials: CredentialsInterface) => { 
    //     this._authStore.login(credentials)
    //      return credentials ; 
    //   })
   }
  // refreshToken(): Observable<tokenInterface> {    
  //   const headers = {
  //     [AUTHORIZATION_HEADER_KEY]: `${AUTHORIZATION_HEADER_PREFIX} ${this._authStore.gRefreshToken}`,
  //   };
  //   return this._http.get<tokenInterface>(ApiRoutes.Refresh, { headers }).pipe(
  //     map(({ accessToken, refreshToken }: tokenInterface) => {
  //       this._authStore.setAccessToken(accessToken);
  //       this._authStore.setRefreshToken(refreshToken);
  //       return { accessToken, refreshToken };
  //     })
  //   );
  // }
  get hasAccessToken(): boolean {
    return !!this._authStore.gAccessToken;
  }

}
