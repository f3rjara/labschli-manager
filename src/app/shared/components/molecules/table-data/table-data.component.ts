import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
/* Angular Material */

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmptyDataTableComponent } from '../../organims/empty-data-table/empty-data-table.component';
import { UserService } from '@app/core/services/users/users.service';
import { RouterLink } from '@angular/router';

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
  imports: [ CommonModule, EmptyDataTableComponent, RouterLink, ...MATERIAL_MODULES],
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent implements AfterViewInit, OnInit {

  private _cd = inject(ChangeDetectorRef);
  private _users = inject(UserService);

  @Input() columnsTable: string[] = ['id', 'name', 'progress', 'fruit'];
  @Input() dataTableShow!: any[];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this._users.getUserData().subscribe({
      next:(response)=>{
        console.log(response);
        //this.dataSource = new MatTableDataSource<any>(response);
        this.dataSource.data = response;

      },
      error:(error)=>{

      }
    });
    console.log(this.dataTableShow);
    console.log(this.dataSource)
  }

  ngAfterViewInit() {
    this._cd.detectChanges();
    console.log("after",this.columnsTable, this.dataTableShow );
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

