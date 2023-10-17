import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmptyDataTableComponent } from '@organims/empty-data-table/empty-data-table.component';

/* Angular Material */
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
];

export interface Column {
  columnDef: string;
  header: string;
  cell?: Function;
  isLink?: boolean;
  url?: string;
  icon?: string;
}

@Component({
  selector: 'app-table-data',
  standalone: true,
  imports: [CommonModule, EmptyDataTableComponent, RouterLink, ...MATERIAL_MODULES],
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent implements OnInit {

  isShowSpinner: boolean = true;

  actionShow: string[] = ['show', 'edit', 'download', 'delete'];

  @Input() emptyTitleTable: string = 'No hay datos para mostrar';
  @Input() columnsTable: Column[] = [];
  @Input() set dataSource(data: any[]) {
    this.setDataSource(data);
  }

  displayedColumns: Array<string> = [];
  _dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  counterDataEmpty: number = 0;

  setDataSource(data: any) {
    this._dataSource = new MatTableDataSource<any>(data);
  }

  hasActionShow(columnDef: string): boolean {
    return this.actionShow.includes(columnDef);
  }

  ngOnInit(): void {
    this.displayedColumns = this.columnsTable.map((colum) => colum.columnDef);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._dataSource.filter = filterValue.toLowerCase();
    if (this._dataSource.paginator) {
      this._dataSource.paginator.firstPage();
    }
  }
}
