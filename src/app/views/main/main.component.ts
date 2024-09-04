import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { OrderPopupComponent } from 'src/app/shared/popups/order-popup/order-popup.component';
import { ArticleService } from 'src/app/shared/services/article.service';
import { ConstantsService } from 'src/app/shared/services/constants.service';
import { ArticleCardType } from 'src/app/types/article-card.type';
import { DefaultResponceType } from 'src/app/types/default-responce.type';
import { ServiceCardType } from 'src/app/types/service-card.type';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  customOptionsReviews: OwlOptions = {
    margin: 26,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: false
  }

  

  advantages = [
    {
      id: '1',
      title: 'Мастерски вовлекаем аудиториюв процесс. ',
      text: 'Мы увеличиваем процент вовлечённости за короткий промежуток времени.'
    },
    {
      id: '2',
      title: 'Разрабатываем бомбическую визуальную концепцию. ',
      text: 'Наши специалисты знают как создать уникальный образ вашего проекта.',
    },
    {
      id: '3',
      title: 'Создаём мощные воронки с помощью текстов. ',
      text: 'Наши копирайтеры создают не только вкусные текста, но и классные воронки.'
    },
    {
      id: '4',
      title: 'Помогаем продавать больше. ',
      text: 'Мы не только помогаем разработать стратегию по продажам, но также корректируем её под нужды заказчика.'
    },
  ]

  reviews = [
    {
      name: 'Станислав',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.',
      img: '/assets/img/reviews/Ellipse 25.png'
    },
    {
      name: 'Алёна',
      text: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.',
      img: '/assets/img/reviews/Ellipse 25-1.png'
    },
    {
      name: 'Мария',
      text: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!',
      img: '/assets/img/reviews/Ellipse 25-2.png'
    },
    {
      name: 'Станислав',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.',
      img: '/assets/img/reviews/Ellipse 25.png'
    },
    {
      name: 'Алёна',
      text: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.',
      img: '/assets/img/reviews/Ellipse 25-1.png'
    },
    {
      name: 'Мария',
      text: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!',
      img: '/assets/img/reviews/Ellipse 25-2.png'
    },
  ]
   
  topArticles : ArticleCardType[] = []


  constructor(
    public cs : ConstantsService,
    private dialog: MatDialog,
    private articleSrvice: ArticleService,
    public constantService: ConstantsService
  ) { }

  ngOnInit(): void {
    this.articleSrvice.getTop()
      .subscribe({
        next: (data: DefaultResponceType | ArticleCardType[]) => {
          if((data as DefaultResponceType).error) {
            throw new Error((data as DefaultResponceType).message)
          }

          this.topArticles = data as ArticleCardType[]
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.error.message) {
            console.error(errorResponse.error.message)
          } else {
            console.error('Не удалось получить "Популярные статьи из блога"');
          }
        }
      })
  }

  openPopup(selected: string) {
     
      const dialogRef = this.dialog.open(OrderPopupComponent, {data : {selected : selected}});
  
  }

}
