import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { RequestService } from '../../services/request.service';
import { ConstantsService } from '../../services/constants.service';
import { FormBuilder, Validators } from '@angular/forms';
import { RequestDataType, RequestType } from 'src/app/types/request.type';
import { DefaultResponceType } from 'src/app/types/default-responce.type';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-consultation-popup',
  templateUrl: './consultation-popup.component.html',
  styleUrls: ['./consultation-popup.component.scss']
})
export class ConsultationPopupComponent implements OnInit {

  name: string = this.authService.getUserName && this.authService.isLoggedIn? this.authService.getUserName : '';


  popupForm = this.fb.group({
    name: [this.name, [Validators.required, Validators.pattern(/^[а-яА-ЯёЁ\ ]+$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^[\d\+]+$/)]],
  })

  revealThankYou: boolean = false;
  requestError: boolean = false;

  constructor(
    private fb : FormBuilder,
    private constantsService : ConstantsService,
    private requestService : RequestService,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
  }

  btnProcess(): void {
    if(this.popupForm.valid && this.popupForm.value.name && this.popupForm.value.phone) {
      this.requestError = false;
      const body : RequestDataType = {
        name : this.popupForm.value.name,
        phone : this.popupForm.value.phone,
        type: RequestType.consultation
      }

      this.requestService.request(body)
        .subscribe({
          next:(data: DefaultResponceType) => {
            if(data.error) {
              console.error(data.message);
              this.requestError = true;
              return
            }

            this.revealThankYou = true;

          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              console.error(errorResponse.error.message)
            } 
            this.requestError = true;
          }
        })
    }
  }

}
