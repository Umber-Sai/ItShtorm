import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ArticleCardType, ArticleResponseType } from 'src/app/types/article-card.type';
import { ArticleType } from 'src/app/types/article.type';
import { CategoryType } from 'src/app/types/category.type';
import { DefaultResponceType } from 'src/app/types/default-responce.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http : HttpClient,
  ) { }

  getTop() : Observable<DefaultResponceType | ArticleCardType[]> {
    return this.http.get<DefaultResponceType | ArticleCardType[]>(environment.api + 'articles/top');
  }

  getArticles(params: Params) : Observable<DefaultResponceType | ArticleResponseType> {
    return this.http.get<DefaultResponceType | ArticleResponseType>(environment.api + 'articles', {
      params : params
    })
  }

  getRelatedArticles(url:string) : Observable<DefaultResponceType | ArticleCardType[]> {
    return this.http.get<DefaultResponceType | ArticleCardType[]>(environment.api + 'articles/related/' + url);
  }

  getArticleByUrl(url:string) : Observable<DefaultResponceType | ArticleType> {
    return this.http.get<DefaultResponceType | ArticleType>(environment.api + 'articles/' + url)
  }

  getCatigories() : Observable<DefaultResponceType | CategoryType[]> {
    return this.http.get<DefaultResponceType | CategoryType[]>(environment.api + 'categories');
  }
}
