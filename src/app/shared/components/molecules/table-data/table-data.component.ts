import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
/* Angular Material */

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DATA_USER_MOCK } from './data.mock';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmptyUsersComponent } from '../../atoms/empty-users/empty-users.component';
import { EmptyDataTableComponent } from '../../organims/empty-data-table/empty-data-table.component';

const MATERIAL_MODULES = [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule];

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

@Component({
  selector: 'app-table-data',
  standalone: true,
  imports: [ CommonModule, EmptyDataTableComponent, ...MATERIAL_MODULES],
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent implements AfterViewInit {

  @Input() columnsTable: string[] = ['id', 'name', 'progress', 'fruit'];
  @Input() dataTable: any[] = [];

  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataTable = DATA_USER_MOCK;
    this.displayedColumns = this.columnsTable;
    this.dataSource = new MatTableDataSource(this.dataTable);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

