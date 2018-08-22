import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UiStateStore } from '../../store/uiState/uiState.store';

export interface IRouteData {
  title: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  routeQueryParams;
  currentRoute;
  searchTerm = '';
  crSub: Subscription;
  ivSub: Subscription;
  pSub: Subscription;
  constructor(
    public uiStateStore: UiStateStore,
    private router: Router
  ) {}

  ngOnInit() {
    this.pSub = this.uiStateStore.routeQueryParams$.subscribe(qp => this.routeQueryParams = qp);
    this.ivSub = this.uiStateStore.inputValue$.subscribe(iv => {
      this.searchTerm = iv;
      if (this.searchTerm) {
        this.onSearchChange();
      }
    });
    this.crSub = this.uiStateStore.currentRoute$.subscribe((cr: IRouteData) => cr ? this.currentRoute = cr.title.toLowerCase() : null);
  }

  ngOnDestroy() {
    this.crSub.unsubscribe();
    this.ivSub.unsubscribe();
    this.pSub.unsubscribe();
  }

  onValueChange(e: KeyboardEvent) {
    return this.uiStateStore.onInputChange(e);
  }

  onSearchChange(): Promise<boolean> {
    return this.router.navigate(['/dashboard'], { queryParams: { searchTerm: this.searchTerm } });
  }

}
