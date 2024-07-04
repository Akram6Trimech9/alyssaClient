import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInterface } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm !: FormGroup

  ngOnInit(): void {
    this.initForm()
  }
  constructor(private fb:FormBuilder,private _auth:AuthService){
  }
  initForm() {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get f() {
    return this.signUpForm.controls;
  }
 validate : boolean = false
 user !: UserInterface
  signUp() {
    if (this.signUpForm.invalid) {
      return;
    }
     this.user= {
      firstName:this.signUpForm.value.firstName , 
      lastName:this.signUpForm.value.lastName,
      email:this.signUpForm.value.email,
      mobile:this.signUpForm.value.mobile,
      password:this.signUpForm.value.password
     }
   this._auth.signUp(this.user).subscribe({
    next:(res)=>{ 
      console.log(res);
      this.validate = true
    },
    error:(err)=>{
      console.log(err)
    }
   }
   )
  }
}
