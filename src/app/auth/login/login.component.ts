import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginInterface } from 'src/app/interfaces';
import { UserInterface } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup

  ngOnInit(): void {
    this.initForm()
  }
  constructor(private fb:FormBuilder,private _auth:AuthService){
  }
  initForm() {
    this.loginForm = this.fb.group({
       email: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  user !: LoginInterface
  signUp() {
    if (this.loginForm.invalid) {
      return;
    }
     this.user= {
        email:this.loginForm.value.email,
       password:this.loginForm.value.password
     }
   this._auth.signUp(this.user).subscribe({
    next:(res)=>{ 
      console.log(res);
     },
    error:(err)=>{
      console.log(err)
    }
   }
   )
  }
}
