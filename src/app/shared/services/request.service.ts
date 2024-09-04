import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultResponceType } from 'src/app/types/default-responce.type';
import { RequestDataType, RequestType } from 'src/app/types/request.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http : HttpClient,
  ) { }

  request(data: RequestDataType) : Observable<DefaultResponceType> {
    return this.http.post<DefaultResponceType>(environment.api + 'requests', data);
  }
}
