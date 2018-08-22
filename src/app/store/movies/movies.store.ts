import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';

import { initialMovie, IMovie } from '../../models/movie/movie.model';
import { IParams } from '../../models/uiState/uiState.model';
import { UiStateStore } from '../../store/uiState/uiState.store';
import { MoviesService } from '../../services/movies/movies.service';

@Injectable()
export class MoviesStore {
  private _movies: BehaviorSubject<IMovie[]> = new BehaviorSubject([ initialMovie ]);
  movies: Observable<IMovie[]> = this._movies.asObservable();
  selectedId;
  config = { duration: 3000 };

  constructor(
    private moviesService: MoviesService,
    public uiStateStore: UiStateStore,
    public snackBar: MatSnackBar
  ) { }

  get movies$(): Observable<IMovie[]> {
    return this.movies;
  }

  get selectedMovie$(): Observable<IMovie> {
    return this.movies.pipe(
      mergeMap((movie: IMovie[]) => movie),
      filter((movie: IMovie) => movie.id === +this.selectedId)
    );
  }

  loadMovies(p: IParams): Promise<void> {
    this.selectedId = p.selected;
    const isSelected = p.selected !== '';
    return this.moviesService.getMovies().then(res => {
      this.uiStateStore.startAction('Retrieving movies', isSelected);
      if (res) {
        const filtered = res.filter(x => {
          x.title.toLowerCase().includes(p.searchTerm.toLowerCase())
        });
        this._movies.next(filtered);
        this.uiStateStore.endAction('Movies retrieved', isSelected);
      } else {
        this.uiStateStore.endAction('No Movies found', isSelected);
        if (!isSelected) {
          this.snackBar.open('No Movies found. Add a new movie or edit the example to start.', null, this.config);
        }
      }
    },
      err =>  {
        this.uiStateStore.endAction('Error retrieving movies', isSelected);
        this.snackBar.open('Error retrieving movies', null, this.config);
      }
    );
  }
}
