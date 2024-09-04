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

    else if(this.action === undefined) {
      if(action === this.actionTypes.like) {
        this.likesCount ++
      }
      if(action === this.actionTypes.dislike) {
        this.dislikesCount ++
      }
      this.action = action
    }
    
    this.commentService.applyAction(action, this.commentId)
      .subscribe({
        next:(data : DefaultResponceType) => {
          this._snackBar.open(data.message)
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.error.message) {
            console.error(errorResponse.error.message)
          } else {
            console.error('Не удалось отправить запрос');
          }
        }
      })
  }
 
}
