import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IParams, params } from '../../models/uiState/uiState.model';
import { MoviesStore } from '../../store/movies/movies.store';
import { UiStateStore } from '../../store/uiState/uiState.store';

/**
 * This is the state container for dashboard.
 * Application State, UI Constants, and local state is
 * passed down to dumb, stateless presenter components (@Input).
 * UI events are passed back up via event emitters (@Output).
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private editMovie: FormGroup;
  displayedColumns = ['checkbox', 'title', 'genre', 'actors', 'year', 'rating'];
  routeQueryParams;
  routeQPSub: Subscription;
  selectedMovieSub: Subscription;

  constructor(
    public moviesStore: MoviesStore,
    public uiStateStore: UiStateStore,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.routeQPSub = this.uiStateStore.routeQueryParams$.subscribe(p => {
      this.routeQueryParams = p;
      this.moviesStore.loadMovies(this.getParams(p));
    });
    this.editMovie = this.formBuilder.group({
      id: '',
      genre: ['', Validators.required ],
      actors: [
        { firstName: ['', Validators.required ] },
        { lastName: ['', Validators.required ] }
      ],
      title: ['', Validators.required ],
      year: ['', Validators.required ],
      rating: ['', Validators.required ],
      poster: ''
    });
    this.selectedMovieSub = this.moviesStore.selectedMovie$.subscribe(movie => {
      this.editMovie.patchValue(movie);
    });
  }

  ngOnDestroy() {
    this.routeQPSub.unsubscribe();
  }

  private getParams(p): IParams {
    return {
      ...params,
      searchTerm: p.get('searchTerm') || params.searchTerm,
      selected: p.get('selected') || params.selected
    };
  }

  select(value: string): Promise<boolean> {
    const selected = value;
    const { searchTerm } = this.routeQueryParams.params;
    return this.router.navigate(['/dashboard'], { queryParams: { searchTerm, selected } });
  }

  onSidenavClose(): Promise<boolean> {
    const { searchTerm } = this.routeQueryParams.params;
    return this.router.navigate(['/dashboard'], { queryParams: { searchTerm } });
  }

}
