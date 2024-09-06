import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { TitleCasePipe } from '@angular/common';
import { MainComponent } from './views/main/main.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatRippleModule } from '@angular/material/core';
import { SharedModule } from './shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { PolicyComponent } from './views/policy/policy.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    MainComponent,
    PolicyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CarouselModule,
    HttpClientModule,
    MatDialogModule,
    MatMenuModule,
    MatRippleModule,
    MatIconModule,
    MatSnackBarModule,
    TitleCasePipe,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
