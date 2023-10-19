import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
import { environment } from 'src/environments/environment';
import {MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatDialogModule
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

  private _router = inject(Router);
  private _dialog = inject(MatDialog);

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
    this._dataSource.paginator = this.paginator;
    this._dataSource.sort = this.sort;
  }

  hasActionShow(columnDef: string): boolean {
    return this.actionShow.includes(columnDef);
  }

  getRouterLink( linkFile: string) {
    return `${environment.APP_STORAGE}${linkFile}`;
  }

  ngOnInit(): void {
    this.displayedColumns = this.columnsTable.map((colum) => colum.columnDef);
    this._dataSource.paginator = this.paginator;
    this._dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._dataSource.filter = filterValue.toLowerCase();
    if (this._dataSource.paginator) {
      this._dataSource.paginator.firstPage();
    }
  }

  eventActionShow($event:Event,column:Column,row:any){
    console.log($event, column, row);
    const action_event = column.columnDef;

    switch (action_event) {
      case "show":
        this._router.navigate([row[action_event]]);
        break;
      case "download":
        const url = `${environment.APP_STORAGE}${row[action_event]}`
         window.open(url, '_blank');
        break;
      case "delete":
        this.openDialog(row[action_event]);
        break;



      default:
        break;
    }

  }

    openDialog(idFile:number): void {
      let dialogoRef = this._dialog.open(DialogDeleteComponent, {
        width: '250px'
      });

      dialogoRef.componentInstance.idFileToDelete = idFile;


  }
}
