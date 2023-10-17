import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Column, TableDataComponent } from '../../molecules/table-data/table-data.component';
import { FilesService } from '@app/core/services/files/files.service';
import { IFiles } from '@app/core/models/users/files.model';

@Component({
  selector: 'app-admin-files-user',
  standalone: true,
  imports: [CommonModule, TableDataComponent],
  providers: [DatePipe],
  templateUrl: './admin-files-user.component.html',
  styleUrls: ['./admin-files-user.component.scss']
})
export class AdminFilesUserComponent implements OnInit {

  @Input() userId: string | null = null;

  private _filesService = inject(FilesService);

  private _datePipe = inject(DatePipe);

  columnsFilesUser: Column[] = [
    {
      columnDef: 'id',
      header: '#'
    },
    {
      columnDef: 'name',
      header: 'Nombre de archivo'
    },
    {
      columnDef: 'extention',
      header: 'Extensión del archivo',
    },
    {
      columnDef: 'size',
      header: 'Tamaño',
    },
    {
      columnDef: 'created_at',
      header: 'Creado el',
    },
    {
      columnDef: 'adminMail',
      header: 'Asignado por',
    },
    {
      columnDef: 'delete',
      header: 'Eliminar',
      isLink: true,
      icon: 'delete',
    }
  ];

  dataFilesUser: any[] = [];

  ngOnInit(): void {
    if(this.userId) {
      this._filesService.getFilesAdminUser(this.userId).subscribe({
        next: (response) => {
          if(response.error) {
            console.error('Hubo un error al obtener los archivos del usuario');
            return;
          }
          this.dataFilesUser = this.mapFilesUser(response.files.original.files);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  mapFilesUser(files: IFiles[]) {
    return files.map((file) => {
      return {
        id: file.id,
        name: file.nameFile,
        extention: file.extFile.toUpperCase(),
        size: this.formatBytes(file.sizeFile, 2),
        created_at: this._datePipe.transform(file.created_at, 'dd - MMMM - yyyy'),
        adminMail: file.adminMail,
        delete: `delete/${file.id}`
      }
    });
  }



  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes = 0, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
