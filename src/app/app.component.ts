import { Component, OnInit } from '@angular/core';
import { ArticleService } from './article.service';
import { Observable } from 'rxjs';
import { Article } from './article';

@Component({
  selector: 'app-root',
  template: `
   <h3>Table 1</h3>

    <dynamic-table
     [dynamicColumns]="dynamicColumns1"
     [displayColumnNames]="displayColNames1"
     [dataToDisplay]="articleData$">
    </dynamic-table>


  `
})
export class AppComponent implements OnInit {
  dynamicColumns1!: string[];
  displayColNames1!: string[];

  dynamicColumns2!: string[];
  displayColNames2!: string[];

  articleData$!: Observable<Article[]>;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
     this.articleData$ = this.articleService.getAllArticles();

     this.dynamicColumns1 = this.articleService.getDynamicColumns1();
     this.displayColNames1 = this.articleService.getDisplayColumnNames1();

  }
}
