import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ConstantsService } from '../../services/constants.service';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = this.authService.isLoggedIn;
  userName : string = this.authService.getUserName
  p = this.routerService.navPoints

  constructor(
    public cs: ConstantsService,
    private authService: AuthService,
    private _snackBar : MatSnackBar,
    public routerService : RouterService,

  ) { }

  ngOnInit(): void {
    this.authService.isLogged$
      .subscribe((val) => {
        this.isLogged = val;
      })
    this.authService.userName$
      .subscribe((name) => {this.userName = name})
  }

  logOut():void {
    this.authService.logOut()
      .subscribe({
        next:(res) => {
          this.authService.removeUserData()
          this._snackBar.open('Вы вышли из системы')
        },
        error:(errorResponse : HttpErrorResponse) => {
          this.authService.removeUserData()
          this._snackBar.open('Вы вышли из системы')
        }
      })
    }


}
