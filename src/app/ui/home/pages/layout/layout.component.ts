import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormSearchUserComponent } from '@organims/form-search-user/form-search-user.component';

import { Column, TableDataComponent } from '@molecules/table-data/table-data.component';
import { LoadderComponent } from '@molecules/loadder/loadder.component';
import { DATA_MOCK_FILES } from './data.mock';



@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ CommonModule, TableDataComponent, FormSearchUserComponent, LoadderComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})

export class LayoutComponent {

  isFormValid:boolean = false;
  showDocumentOfUser: boolean = false;

  documentUserToSearch:string = '';

  isLoadderShow: boolean = false;

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
    },
    {
      columnDef: 'download',
      header: 'Descargar'
    }
  ];


  /* dataMockFilesUser: any[] = [] */
  dataMockFilesUser: any[] = DATA_MOCK_FILES;

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
      setTimeout(() => {
        this.isLoadderShow = false;
      }, 1500);
    }
  }


}
