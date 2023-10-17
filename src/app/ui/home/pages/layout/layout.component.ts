import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe} from '@angular/common';
import { FormSearchUserComponent } from '@organims/form-search-user/form-search-user.component';

import { Column, TableDataComponent } from '@molecules/table-data/table-data.component';
import { LoadderComponent } from '@molecules/loadder/loadder.component';
import { IFiles } from '@app/core/models/users/files.model';
import { FilesService } from '@app/core/services/files/files.service';



@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ CommonModule, TableDataComponent, FormSearchUserComponent, LoadderComponent],
  providers: [DatePipe],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})

export class LayoutComponent {

  private _datePipe = inject(DatePipe);

  private _filesService = inject(FilesService);

  isFormValid:boolean = false;
  showDocumentOfUser: boolean = false;

  messageFileUser:string = 'No hay archivos asignados al usuario';

  documentUserToSearch:string = '';

  isLoadderShow: boolean = false;

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
      columnDef: 'download',
      header: 'Descargar',
      isLink: true,
      icon: 'download',
    }
  ];

  dataFilesUser: any[] = [];

  onChangeFormValidity(isFormValid: boolean){
    this.isFormValid = isFormValid;
    if (!this.isFormValid) {
      this.showDocumentOfUser = false;
    }
  }

  onFormSubmit(value:{document:string}){
    this.isLoadderShow = true;
    this.documentUserToSearch = value.document;
    if (this.documentUserToSearch && this.isFormValid) {
      this.showDocumentOfUser = true;
      this._filesService.getFilesUser(Number(this.documentUserToSearch)).subscribe({
        next: (response) => {
          if(response.error) {
            console.log('Hubo un error al obtener los archivos del usuario');
            return;
          }
          this.dataFilesUser = this.mapFilesUser(response.files.original.files);
        },
        error: (err) => {
          this.isLoadderShow = false;
          this.dataFilesUser = [];
          if( err.status === 404){
            this.messageFileUser = 'Usuario no encontrado, revise el número de documento';
            return;
          }
        },
        complete: () => {
          this.isLoadderShow = false;
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
        download: `/${file.linkFile}`
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
