import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UIServiceService {

  private drawerState = new BehaviorSubject<boolean>(true);
  drawerState$ = this.drawerState.asObservable();

  /**
   * Cambia el estado del drawer
   *
   * @returns void
   * @memberof UIServiceService
   */
  toggleDrawer() {
    const state = this.drawerState.getValue();
    if (state !== null) {
      this.drawerState.next(!state);
    }
  }
}
