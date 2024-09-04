import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DefaultResponceType } from 'src/app/types/default-responce.type';
import { LoginResponceType } from 'src/app/types/login-responce.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb : FormBuilder,
    private authService : AuthService,
    private _snackBar : MatSnackBar,
    private router : Router,
  ) { }


  loginForm = this.fb.group({
    email : ['', {
      validators : [Validators.required, Validators.email],
      updateOn : 'blur'
    }],
    password : ['', [Validators.required]],
    rememberMe : [false]
  })

  ngOnInit(): void {
  }

  buttonProccess():void {
    if(this.loginForm.valid) {
      const data = this.loginForm.value as {email: string, password: string, rememberMe: boolean}
      this.authService.login(data)
        .subscribe({
          next:(data: DefaultResponceType | LoginResponceType) => {
            if((data as DefaultResponceType).error) {
              throw new Error((data as DefaultResponceType).message);
            }

            const userData = data as LoginResponceType;
            if(userData && userData.accessToken && userData.refreshToken && userData.userId) {
              this._snackBar.open('Вы успешно залогинены')
              this.router.navigate(['/'])
            }
          },
          error:(errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message)
            } else {
              this._snackBar.open('Ошибка авторизации');
            }
          }
        })
    }
  }

}
