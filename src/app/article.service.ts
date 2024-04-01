import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Article } from './article';

const All_ARTICLES: Article[] = [
  { id: 1, title: 'Angular Tutorial', category: 'Angular', writer: 'Mohit', active: false, last_update: new Date(), minutes: 1, editing: false},
  { id: 2, title: 'Angular Material Tutorial', category: 'Angular', writer: 'Krishn', active: false, last_update: new Date(), minutes: 1, editing: false},
  { id: 3, title: 'Spring tutorial', category: 'Spring', writer: 'Mohit', active: false , last_update: new Date(),minutes: 1, editing: false },
  { id: 4, title: 'Hibernate tutorial', category: 'Hibernate', writer: 'Krishn', active: false, last_update: new Date(),minutes: 1, editing: false},
  { id: 5, title: 'Java Tutorial', category: 'Java', writer: 'Sudesh', active: false, last_update: new Date(),minutes: 1, editing: false},
  { id: 6, title: 'JavaScript Tutorial', category: 'JavaScript', writer: 'Shiv',  active: false, last_update: new Date(),minutes: 1, editing: false},
];

@Injectable({
   providedIn: 'root'
})
export class ArticleService {
   getAllArticles() {
      return of(All_ARTICLES);
   }
  getDynamicColumns1() {
    return ['id', 'title', 'category', 'writer', 'active', 'last_update', 'minutes'];
  }
   getDisplayColumnNames1() {
      return ['Id', 'Title', 'Category', 'Writer', 'Active', 'Last Update', 'Minutes'];
   }
   getDynamicColumns2() {
      return ['id', 'title'];
   }
   getDisplayColumnNames2() {
      return ['Id', 'Title'];
   }
}
