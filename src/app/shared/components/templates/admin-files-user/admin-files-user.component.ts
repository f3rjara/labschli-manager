import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Column, TableDataComponent } from '../../molecules/table-data/table-data.component';
import { DATA_MOCK_FILES } from '@app/ui/home/pages/layout/data.mock';

@Component({
  selector: 'app-admin-files-user',
  standalone: true,
  imports: [CommonModule, TableDataComponent],
  templateUrl: './admin-files-user.component.html',
  styleUrls: ['./admin-files-user.component.scss']
})
export class AdminFilesUserComponent {

  columnsFilesUser: Column[] = [
    {
      columnDef: 'name',
      header: 'Nombre'
    },
    {
      columnDef: 'file',
      header: 'Archivo',
    },
    {
      columnDef: 'size',
      header: 'Tamaño',
    },
    {
      columnDef: 'update',
      header: 'Actualizado',
      isLink: true,
    },
    {
      columnDef: 'delete',
      header: 'Eliminar',
      isLink: true,
    }
  ];

  dataMockFilesUser: any[] = DATA_MOCK_FILES;

}
