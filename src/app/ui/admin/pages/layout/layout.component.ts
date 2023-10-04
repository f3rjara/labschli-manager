import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';
import { UIServiceService } from '@services/ui/uiservice.service';


const MATERIAL_MODULES = [
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatDividerModule
];
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, AsyncPipe, ...MATERIAL_MODULES ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  private _router = inject(Router);
  private breakpointObserver = inject(BreakpointObserver);
  private uiService = inject(UIServiceService);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor() {}

  ngOnInit(): void {
    this.uiService.drawerState$.subscribe((state) => {
      this.drawer.toggle(state);
    });
  }

  logout() {
    this._router.navigate(['/auth/login']);
  }
}
