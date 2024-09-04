import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleCardType } from 'src/app/types/article-card.type';
import { ServiceCardType } from 'src/app/types/service-card.type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() service: ServiceCardType | null = null;
  @Input() article: ArticleCardType | null = null;
  @Output() openPopupEvent: EventEmitter<string> = new EventEmitter<string>()

  serverStaticPath = environment.serverStaticPath;
  constructor() { }

  ngOnInit(): void {
  }

  openPopup(name: string):void {
    this.openPopupEvent.next(name)
  }

}
