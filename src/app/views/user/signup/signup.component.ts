import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DefaultResponceType } from 'src/app/types/default-responce.type';
import { LoginResponceType } from 'src/app/types/login-responce.type';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = this.fb.group({
    name : ['', [Validators.required, Validators.pattern(/^[а-яА-ЯёЁ\ ]+$/)]],
    email : ['', {
      validators : [Validators.required, Validators.email],
      updateOn : 'blur'
    }],
    password : ['', {
      validators:  [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)],
      updateOn: 'blur'
    }],
    agree : [false, [Validators.requiredTrue]]
  })

  constructor(
    private fb : FormBuilder,
    private authService : AuthService,
    private _snackBar : MatSnackBar,
    private router : Router,
  ) { }

  ngOnInit(): void {
  }

  signup():void {
    if(this.signupForm.valid && this.signupForm.value.name && this.signupForm.value.email && this.signupForm.value.password) {

      this.authService.signup(this.signupForm.value.name, this.signupForm.value.email as string, this.signupForm.value.password as string)
        .subscribe({
          next : (data : DefaultResponceType | LoginResponceType) => {
            if((data as DefaultResponceType).error) {
              throw new Error((data as DefaultResponceType).message);
            }

            const userData = data as LoginResponceType;
            if(userData && userData.accessToken && userData.refreshToken && userData.userId) {
              // this.authService.setTokens(userData.accessToken, userData.refreshToken);
              this._snackBar.open('Вы успешно залогинены');
              this.router.navigate(['/'])
            }
          },
          error : (errorResponse: HttpErrorResponse) =>  {
            if(errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message)
            } else {
              this._snackBar.open('Ошибка соединения')
            }
          }
        })
    } else {
      this.signupForm.markAllAsTouched()
    }
  }

}
