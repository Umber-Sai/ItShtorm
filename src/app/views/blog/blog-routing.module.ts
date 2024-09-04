import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllArticlesComponent } from './all-articles/all-articles.component';
import { ArticleComponent } from './article/article.component';

const routes: Routes = [
  {path: 'article', component : AllArticlesComponent},
  {path: 'article/:url', component : ArticleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
