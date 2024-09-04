import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { MatRippleModule } from '@angular/material/core';
import { OrderPopupComponent } from './popups/order-popup/order-popup.component';
import { ConsultationPopupComponent } from './popups/consultation-popup/consultation-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { PhonePipe } from './pipes/phone.pipe';
import { CommentActionsComponent } from './comment-actions/comment-actions.component';




@NgModule({
  declarations: [
    CardComponent,
    OrderPopupComponent,
    ConsultationPopupComponent,
    PhonePipe,
    CommentActionsComponent,
  ],
  imports: [
    CommonModule,
    MatRippleModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports : [
    CardComponent,
    OrderPopupComponent,
    ConsultationPopupComponent,
    PhonePipe,
    CommentActionsComponent,
  ]
})
export class SharedModule { }
