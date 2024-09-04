import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/shared/services/article.service';
import { ArticleCardType, ArticleResponseType } from 'src/app/types/article-card.type';
import { CategoryType } from 'src/app/types/category.type';
import { DefaultResponceType } from 'src/app/types/default-responce.type';

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss']
})
export class AllArticlesComponent implements OnInit {

  categories : CategoryType[] = [];
  activeCatigories : CategoryType[] = []
  selectOpen : boolean = false;
  articles : ArticleCardType[] = []

  pages : number[] = []
  currentPage : number = 1;

  constructor(
    private articleService: ArticleService,
    private activatedRoute : ActivatedRoute,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.articleService.getCatigories()
      .subscribe({
        next:(data : DefaultResponceType | CategoryType[])=> {
          if((data as DefaultResponceType).error) {
            throw new Error((data as DefaultResponceType).message)
          }

          this.categories = data as CategoryType[];

          this.activatedRoute.queryParams
            .subscribe((params) => {
              const activeParams = Array.isArray(params['categories'])? params['categories'] : [params['categories']];
              activeParams.forEach((element: string) => {
                const activeFilter = this.categories.find(item => item.url === element);
                if(activeFilter) {
                  activeFilter.isActive = true;
                }
                this.activeCatigories = this.categories.filter(item => item.isActive)
              });

              this.articleService.getArticles(params)
                .subscribe({
                  next: (data : DefaultResponceType | ArticleResponseType) => {
                    if((data as DefaultResponceType).error) {
                      throw new Error((data as DefaultResponceType).message)
                    }

                    const respData = data as ArticleResponseType
                    this.articles = respData.items;
                    this.pages = []
                    for (let i = 0; i < respData.pages; i++) {
                      this.pages.push(i + 1);
                    }
                  },
                  error: (errorResponse: HttpErrorResponse) => {
                    if (errorResponse.error && errorResponse.error.message) {
                      console.error(errorResponse.error.message)
                    } else {
                      console.error('Не удалось получить статьи');
                    }
                  }
                })
            })
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.error.message) {
            console.error(errorResponse.error.message)
          } else {
            console.error('Не удалось получить "Категории"');
          }
        }
      })
  }

  updateSelect():void {
    this.selectOpen = !this.selectOpen
  }

  updateFilters(filter : CategoryType) {
    filter.isActive = !filter.isActive;
    this.currentPage = 1;
    this.navigate();
  }

  nextPage():void {
    if(this.currentPage < this.pages.length) {
      this.currentPage = this.currentPage + 1;
      this.navigate();
    }
  }

  prevPage():void {
    if(this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      this.navigate();
    }
  }

  changePage(page: number):void {
    this.currentPage = page;
    this.navigate()
  }

  private navigate (): void {
    const params : {categories : string[], page : number} = {categories : [], page : this.currentPage}
    this.categories.forEach(item => {
      if(item.isActive) params.categories.push(item.url);
    });
    this.activeCatigories = this.categories.filter(item => item.isActive)
    this.router.navigate(['/article'],{
      queryParams : params
    })
  }
}
