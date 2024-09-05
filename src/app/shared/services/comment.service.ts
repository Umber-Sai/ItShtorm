import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, concatMap, map, of } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CommentActionType, CommentActionsType, CommentsResponseType } from 'src/app/types/comment.type';
import { DefaultResponceType } from 'src/app/types/default-responce.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient,
    private authService : AuthService
  ) { }

  getComments(id: string, offset: number = 0): Observable<DefaultResponceType | CommentsResponseType> {
    return this.http.get<DefaultResponceType | CommentsResponseType>(environment.api + 'comments', {
      params: { 'article': id, 'offset': offset }
    }).pipe(
        concatMap((resp) => {
          if (this.authService.isLoggedIn) {
            return this.getUserActions(id)
              .pipe(
                map((data: DefaultResponceType | CommentActionsType[]) => {
                        if ((data as DefaultResponceType).error) {
                          throw new Error((data as DefaultResponceType).message)
                        }
                        const actions = data as CommentActionsType[]
                        const comments = (resp as CommentsResponseType).comments
                        if(comments) {
                          actions.forEach(action => {
                            const commentWithAction = comments.find(item => item.id === action.comment);
                            if(commentWithAction) commentWithAction.action = action.action;
                          })
                        }
                        return resp;
                      }),
                catchError((errorResponse: HttpErrorResponse) => {
                        if (errorResponse.error && errorResponse.error.message) {
                          console.error(errorResponse.error.message)
                        } else {
                          console.error('Не удалось получить действрия к комментариям');
                        }
                        return of(resp)
                      }
                    ),
                  )

          } else return of(resp)
        })
      )
  }



  private getUserActions(id: string): Observable<DefaultResponceType | CommentActionsType[]> {
    return this.http.get<DefaultResponceType | CommentActionsType[]>(environment.api + 'comments/article-comment-actions', {
      params: { 'articleId': id }
    });
  }



  applyAction(action: CommentActionType, commentId: string): Observable<DefaultResponceType> {
    return this.http.post<DefaultResponceType>(environment.api + 'comments/' + commentId + '/apply-action', { 'action': action });
  }

  addComment(body: {text: string, article: string}): Observable<DefaultResponceType> {
    return this.http.post<DefaultResponceType>(environment.api + 'comments', body)
  }

}
