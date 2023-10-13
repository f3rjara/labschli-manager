import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDataComponent } from '@molecules/table-data/table-data.component';

@Component({
  selector: 'app-list-roles',
  standalone: true,
  imports: [CommonModule, TableDataComponent],
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.scss']
})
export class ListRolesComponent {

  columnsUsers: string[] = ['name', 'email', 'role', 'actions'];
}
