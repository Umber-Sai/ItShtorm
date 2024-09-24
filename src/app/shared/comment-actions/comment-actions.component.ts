import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentActionType } from 'src/app/types/comment.type';
import { CommentService } from '../services/comment.service';
import { DefaultResponceType } from 'src/app/types/default-responce.type';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'comment-actions',
  templateUrl: './comment-actions.component.html',
  styleUrls: ['./comment-actions.component.scss']
})
export class CommentActionsComponent implements OnInit {

  @Input() likesCount : number = 0;
  @Input() dislikesCount : number = 0;
  @Input() action : CommentActionType | undefined = undefined;
  @Input() commentId : string = ''
  actionTypes = CommentActionType;
  isLogged = this.authService.isLoggedIn






  constructor(
    private commentService: CommentService,
    private _snackBar : MatSnackBar,
    private authService : AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((b) => this.isLogged = b)
  }

  actionProccess(action : CommentActionType): void {
    if(!this.isLogged) return
    
    this.commentService.applyAction(action, this.commentId)
      .subscribe({
        next:(responseData : DefaultResponceType) => {
          if(responseData.error) {
            this._snackBar.open(responseData.message)
          } else {
            // новыое действие
            // действие совпадает с тем что было
            // противоположное действие


            if(this.action === this.actionTypes.like && action === this.actionTypes.dislike) {
              this.likesCount --
              this.dislikesCount ++
              this.action = action
            }
        
            else if(this.action === this.actionTypes.dislike && action === this.actionTypes.like) {
              this.likesCount ++
              this.dislikesCount --
              this.action = action
            }
        
            else if(this.action === action) {
              if(action === this.actionTypes.like) {
                this.likesCount --
              }
              if(action === this.actionTypes.dislike) {
                this.dislikesCount --
              }
              this.action = undefined;
            }
        
            else if(this.action === undefined || this.action === this.actionTypes.violate) {
              if(action === this.actionTypes.like) {
                this.likesCount ++
              }
              if(action === this.actionTypes.dislike) {
                this.dislikesCount ++
              }
              this.action = action
            }
            this._snackBar.open(responseData.message)
          }
        },
        error: (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse)
          if (errorResponse.error && errorResponse.error.message) {
            this._snackBar.open(errorResponse.error.message)
          } else {
            this._snackBar.open('Не удалось выполнить действие')
          }
        }
      })

  }
 
}
