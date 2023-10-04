import { Component } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { FormSearchUserComponent } from '@organims/form-search-user/form-search-user.component';
import { TableDataComponent } from '@molecules/table-data/table-data.component';



@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ TableDataComponent, FormSearchUserComponent, CommonModule, NgIf, NgClass],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})

export class LayoutComponent {

  isFormValid:boolean = false;
  showDocumentOfUser: boolean = false;
  documentUserToSearch:string = '';

  onChangeFormValidity(isFormValid: boolean){
    this.isFormValid = isFormValid;
    if (!this.isFormValid) {
      this.showDocumentOfUser = false;
    }
  }

  onFormSubmit(value:{document:string}){
    this.documentUserToSearch = value.document;
    if (this.documentUserToSearch && this.isFormValid) {
      this.showDocumentOfUser = true;
    }
  }



}
