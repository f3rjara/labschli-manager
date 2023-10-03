import { Component } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  type: string;
  weight: number;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Documento 1' , type: 'pdf', weight: 1.79, action: 'descargar'},
  {name: 'Documento 2' , type: 'pdf', weight: 4.26, action: 'descargar'},
  {name: 'Documento 3' , type: 'pdf', weight: 6.94, action: 'descargar'},
  {name: 'Documento 4' , type: 'pdf', weight: 6.94, action: 'descargar'}
];

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatTableModule, CommonModule, NgIf, NgClass, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  displayedColumns: string[] = ['name', 'type', 'weight', 'action'];
  dataSource = ELEMENT_DATA;
  showSpinner: boolean = true;
}
