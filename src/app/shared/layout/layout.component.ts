import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {

  tel = '+7 (499) 343-13-34';
  constructor() { }

  ngOnInit(): void {
  }

}
