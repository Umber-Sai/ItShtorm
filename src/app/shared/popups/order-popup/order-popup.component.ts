import { Component, HostListener, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConstantsService } from '../../services/constants.service';
import { RequestService } from '../../services/request.service';
import { RequestDataType, RequestType } from 'src/app/types/request.type';
import { HttpErrorResponse } from '@angular/common/http';
import { DefaultResponceType } from 'src/app/types/default-responce.type';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-order-popup',
  templateUrl: './order-popup.component.html',
  styleUrls: ['./order-popup.component.scss']
})
export class OrderPopupComponent implements OnInit {

  readonly data = inject<{selected: string}>(MAT_DIALOG_DATA);
  selectOpen = false;
  services = this.constantsService.services.map(item => {
    return item.title
  });
  requestError = false;
  revealThankYou = false;
  name: string = this.authService.getUserName && this.authService.isLoggedIn? this.authService.getUserName : '';

  popupForm = this.fb.group({
    category: [this.data.selected, Validators.required],
    name: [this.name, [Validators.required, Validators.pattern(/^[а-яА-ЯёЁ\ ]+$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^[\d\+]+$/)]],
  })


  constructor(
    private fb : FormBuilder,
    private constantsService : ConstantsService,
    private requestService : RequestService,
    private authService : AuthService
  ) { }

  

  ngOnInit(): void {
  }

  openSelect() : void {
    this.selectOpen = true
  }

  pickOption(option: string) : void {
    this.popupForm.get('category')?.setValue(option);
    
    setTimeout(() => {
      this.selectOpen = false;
    }, 10)
  }

  btnProcess() : void {
    if(this.popupForm.valid && this.popupForm.value.name && this.popupForm.value.category && this.popupForm.value.phone) {
      this.requestError = false;
      const body : RequestDataType = {
        name : this.popupForm.value.name,
        phone : this.popupForm.value.phone,
        service : this.popupForm.value.category,
        type: RequestType.order
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
