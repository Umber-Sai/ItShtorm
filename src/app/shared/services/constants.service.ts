import { Injectable } from '@angular/core';
import { ServiceCardType } from 'src/app/types/service-card.type';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  phone = '+74993431334';
  email = 'info@itstorm.com';

  services: ServiceCardType[] = [
    {
      title: 'Создание сайтов',
      description: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
      image: './assets/img/services/1.png',
      price: '7 500'
    },
    {
      title: 'Продвижение',
      description: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
      image: './assets/img/services/2.png',
      price: '3 500'
    },
    {
      title: 'Реклама',
      description: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
      image: './assets/img/services/3.png',
      price: '1 000'
    },
    {
      title: 'Копирайтинг',
      description: 'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
      image: './assets/img/services/4.png',
      price: '750'
    }
  ]

  constructor() { }
}
