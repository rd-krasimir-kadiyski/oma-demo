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
  @Input('columnValidations') columnValidations!: any[];

  dataSource = new MatTableDataSource();
  options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
  validationStatus: { [key: string]: boolean } = {};

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

    this.dataSource.data.unshift(newRecord);
    this.dataSource._updateChangeSubscription(); // Refresh the table
  }

  validateInput(colName: string, value: any){
    let current = this.columnValidations.filter(e => e.name === colName);
    if (current.length > 0) {
      let currentValidation = current[0];
      debugger;
      if (currentValidation.validator) {
        let numberValidator = currentValidation.validator;
        if (value < numberValidator.min || value > numberValidator.max) {
          return false;
        }
      }
    }
    return true;
  }

  ngAfterViewInit() {
    this.dataToDisplay$.subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  isTypeOf(value: any, type: string, instance?: string): boolean {
    switch (instance) {
      case 'date': {
        return value instanceof Date;
      }
      case 'array': {
        return Array.isArray(value);
      }
      default: {
        return typeof value === type;
      }
    }
  }
}
