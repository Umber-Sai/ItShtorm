import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ArticleService } from 'src/app/shared/services/article.service';
import { CommentService } from 'src/app/shared/services/comment.service';
import { ArticleCardType } from 'src/app/types/article-card.type';
import { ArticleType } from 'src/app/types/article.type';
import { CommentType, CommentsResponseType } from 'src/app/types/comment.type';
import { DefaultResponceType } from 'src/app/types/default-responce.type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  articleData: ArticleType = {} as ArticleType;
  relatedArticles : ArticleCardType[] = [];
  comments : CommentType[] = []
  commentsGroups: CommentType[][] = [];
  incorrectComment: boolean = false

  serverStaticPath = environment.serverStaticPath;


  isLogged = this.authService.isLoggedIn;
  commentValue: string = ''


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private authService: AuthService,
    private commentService: CommentService,
    private _snackBar : MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.authService.isLogged$
      .subscribe((resp) => {this.isLogged = resp});

    this.activatedRoute.params.subscribe((data: Params) => {
      if(data['url']) {
        this.articleService.getArticleByUrl(data['url'])
          .subscribe({
            next:(data : DefaultResponceType | ArticleType) => {
              if((data as DefaultResponceType).error) {
                throw new Error((data as DefaultResponceType).message)
              }

              this.articleData = data as ArticleType;
              this.loadComments()

            },
            error: (errorResponse: HttpErrorResponse) => {
              if (errorResponse.error && errorResponse.error.message) {
                console.error(errorResponse.error.message)
              } else {
                console.error('Не удалось получить статью');
              }
              this.router.navigate(['/'])
            }
          });
        
        this.articleService.getRelatedArticles(data['url'])
          .subscribe({
            next:(data : DefaultResponceType | ArticleCardType[]) => {
              if((data as DefaultResponceType).error) {
                throw new Error((data as DefaultResponceType).message)
              }

              this.relatedArticles = data as ArticleCardType[]
            },
            error: (errorResponse: HttpErrorResponse) => {
              if (errorResponse.error && errorResponse.error.message) {
                console.error(errorResponse.error.message)
              } else {
                console.error('Не удалось получить похожие статьи');
              }
            }
          })
      } else {
        this.router.navigate(['/'])
      }
    })
  }

  private loadComments(): void {
    this.commentService.getComments(this.articleData.id)
      .subscribe({
        next: (data: DefaultResponceType | CommentsResponseType) => {
          if ((data as DefaultResponceType).error) {
            throw new Error((data as DefaultResponceType).message)
          }
          // this.commentsCount = (data as CommentsResponseType).allCount;
          const comments = (data as CommentsResponseType).comments
          this.commentsQuery(comments);
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.error.message) {
            console.error(errorResponse.error.message)
          } else {
            console.error('Не удалось получить комментарии');
          }
        }
      })
  }

  publicCommnet(): void {
    if(this.commentValue.length > 10) {
      this.incorrectComment = false
      const body = {
        text : this.commentValue,
        article : this.articleData.id
      }
      this.commentService.addComment(body) 
        .subscribe({
          next:(data : DefaultResponceType) => {
            this._snackBar.open(data.message)
            if(!data.error) {
              this.loadComments();
              this.commentValue = ''
            }
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message)
            } else {
              this._snackBar.open('Что-то пошло не так :(')
            }
          }
        });
    } else {
      this.incorrectComment = true
    }
  }

  private commentsQuery(comments: CommentType[]):void {
    // this.comments = comments
    this.commentsGroups = [];
    this.comments = []
    this.commentsGroups.push(comments.splice(0, 3));
    while(comments.length > 0) {
      this.commentsGroups.push(comments.splice(0, 10));
    }
   this.loadMoreComments()
  }

  loadMoreComments(): void {
    this.commentsGroups.splice(0, 1)[0].forEach(item => this.comments.push(item));
  }


}
