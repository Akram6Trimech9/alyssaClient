import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocalStorage, Role } from "src/app/enum";
import { UserInterface } from "src/app/interfaces/user";
   import { AuthService } from "./auth.service";

@Injectable()
export class CurrentUserService {
    constructor(private _authService :AuthService){ 

    }
    currentUser$  = new BehaviorSubject<UserInterface |null | undefined>(undefined) ; 
    currentUserRole$  = new BehaviorSubject<Role |null | undefined>(undefined) ; 

    setCurrentUser(){
       if(localStorage.getItem(LocalStorage.AccessToken)){ 
        this._authService.getUserInfo().subscribe(res=>{
            console.log(res)
             this.currentUser$.next(res) 
            // this.currentUserRole$.next(res.role)
        })
       }else{
        this.currentUser$.next(null)
       }
    }}
 