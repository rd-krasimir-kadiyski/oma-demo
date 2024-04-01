import {Component, AfterViewInit, ViewChild, Input} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Observable} from 'rxjs';
import {Article} from "./article";

@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.css'
})
export class DynamicTableComponent implements AfterViewInit {
  @ViewChild(MatSort) sort = {} as MatSort;
  @ViewChild(MatPaginator) paginator = {} as MatPaginator;

  @Input('dynamicColumns') dynamicColumns!: string[];
  @Input('displayColumnNames') displayColumnNames!: string[];
  @Input('dataToDisplay') dataToDisplay$!: Observable<any>;

  dataSource = new MatTableDataSource();
  options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
  editRow(row: any) {
    row.editing = !row.editing;
  }
  addNewRecord() {

    let newRecord: Article = {
      id: 1,
      title: '',
      category: '',
      writer: '',
      active: false,
      last_update: new Date(),
      minutes: 0,
      editing: true
    };

    // Add the new record to the beginning of the data source
    this.dataSource.data.unshift(newRecord);
    this.dataSource._updateChangeSubscription(); // Refresh the table
  }
  validateMinutes(article: Article) {
    if (article.minutes < 0) {
      article.minutes = 0;
    }
  }
  ngAfterViewInit() {
    this.dataToDisplay$.subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}
