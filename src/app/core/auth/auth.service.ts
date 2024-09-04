import { Injectable } from '@angular/core';
import { DefaultResponceType } from 'src/app/types/default-responce.type';
import { LoginResponceType } from 'src/app/types/login-responce.type';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject, map } from 'rxjs';
import { UserType } from 'src/app/types/user.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly accessTokenKey = 'accessToken'
  readonly refreshTokenKey = 'refreshToken'
  readonly userIdKey = 'userId'
  readonly userNameKey = 'userName'
  readonly userEmailKey = 'userEmail'

  private isLogged: boolean = false;
  isLogged$: Subject<boolean> = new Subject<boolean>();
  userName$: Subject<string> = new Subject<string>();

  constructor(
    private http : HttpClient,
  ) {
    this.isLogged = !!localStorage.getItem(this.accessTokenKey);
  }

  login(data: {email: string, password: string, rememberMe: boolean}): Observable<DefaultResponceType | LoginResponceType> {
    return this.http.post<DefaultResponceType | LoginResponceType>(environment.api + 'login', data)
    .pipe(
      map((resp) => {
        this.setAllUserStuffPipe(resp)
        return resp;
      })
    )
  }

  signup(name: string, email: string, password: string): Observable<DefaultResponceType | LoginResponceType> {
    return this.http.post<DefaultResponceType | LoginResponceType>(environment.api + 'signup', {name, email, password})
    .pipe(
      map((resp) => {
        this.setAllUserStuffPipe(resp)
        return resp;
      })
    )
  }

  logOut(): Observable<DefaultResponceType> {
    return this.http.post<DefaultResponceType>(environment.api + 'logout', {refreshToken : localStorage.getItem(this.refreshTokenKey)});
  }
  
  refresh(): Observable<DefaultResponceType | LoginResponceType> {
    return this.http.post<DefaultResponceType | LoginResponceType>(environment.api + 'refresh', {refreshToken : localStorage.getItem(this.refreshTokenKey)});
  }
  


  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken)
    localStorage.setItem(this.refreshTokenKey, refreshToken)
    this.isLogged = true;
    this.isLogged$.next(true)
  }


  setUserData(userData: UserType ):void {
    localStorage.setItem(this.userIdKey, userData.id)
    localStorage.setItem(this.userNameKey, userData.name)
    localStorage.setItem(this.userEmailKey, userData.email)
    this.userName$.next(userData.name)
  }

  removeUserData(): void {
    localStorage.removeItem(this.accessTokenKey)
    localStorage.removeItem(this.refreshTokenKey)
    localStorage.removeItem(this.userIdKey)
    this.isLogged$.next(false)
  }

  removeTokens() :void {
    localStorage.removeItem(this.accessTokenKey)
    localStorage.removeItem(this.refreshTokenKey)
  }

  setAllUserStuffPipe (resp : DefaultResponceType | LoginResponceType) :void {
    const userData = resp as LoginResponceType
    if(userData.accessToken && userData.refreshToken) {
      this.setTokens(userData.accessToken, userData.refreshToken);
      this.http.get<DefaultResponceType | UserType>(environment.api + 'users', {
        headers : {'x-auth' : userData.accessToken}
      })
        .subscribe({
          next: (data: DefaultResponceType | UserType) => {
            if((data as DefaultResponceType).error) {
              console.error((data as DefaultResponceType).message);
            }

            this.setUserData(data as UserType);
          },
          error:(errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              console.error(errorResponse.error.message)
            } else {
              console.error('Ошибка авторизации');
            }
          }
        })
    }
  }

  get isLoggedIn(): boolean {
    return this.isLogged
  }

  get getUserName(): string {
    const userName = localStorage.getItem(this.userNameKey);
    return userName? userName : 'not found';
  }

  get getTokens(): {accessToken : string, refreshToken : string} | null {
    const accessToken = localStorage.getItem(this.accessTokenKey);
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    if(accessToken && refreshToken) {
      return {accessToken, refreshToken}
    }
    return null
  }


}
