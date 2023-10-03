import { Component, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NgIf, CommonModule, RouterOutlet, MatSidenavModule, MatListModule, MatIconModule, MatDividerModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {

  private _router = inject(Router);
  logout(){
    this._router.navigate(['/auth/login']);
  }
}
