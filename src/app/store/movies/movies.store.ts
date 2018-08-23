import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';

import { initialMovie, IMovie, newMovie } from '../../models/movie/movie.model';
import { IParams } from '../../models/uiState/uiState.model';
import { UiStateStore } from '../../store/uiState/uiState.store';
import { MoviesService } from '../../services/movies/movies.service';
import { generateId } from '../../utilities/generateId';

@Injectable()
export class MoviesStore {
  private _movies: BehaviorSubject<IMovie[]> = new BehaviorSubject([ initialMovie ]);
  movies: Observable<IMovie[]> = this._movies.asObservable();
  private _selectedMovie: BehaviorSubject<IMovie> = new BehaviorSubject(initialMovie);
  readonly selectedMovie: Observable<IMovie> = this._selectedMovie.asObservable();
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
    return this.selectedMovie;
  }

  updateMovie(movie): Promise<void> {
    return this.moviesService.getMovies().then(res => {
      res ? this.updateCurrentMovie(movie, res) : this.updateExampleMovie(movie);
    });
  }

  deleteMovie(id): Promise<void> {
    return this.moviesService.getMovies().then(movies => {
      const restOfMovies = movies.filter(m => m.id !== id);
      return this.moviesService.updateMovies(restOfMovies).then(res => {
        this._movies.next(res);
      });
    });
  }

  private updateCurrentMovie(movie, movies): Promise<void> {
    const restOfMovies = movies.filter(m => m.id !== movie.id);
    return this.moviesService.updateMovies([...restOfMovies, movie]).then(res => {
      this._movies.next(res);
    });
  }

  private updateExampleMovie(movie): Promise<void> {
    return this.moviesService.updateMovies([movie]).then(res => {
      this._movies.next(res);
    });
  }

  private filterSelectedMovie(): Subscription {
    const selectedMovie: Observable<IMovie> = this.movies$.pipe(
      mergeMap((movie: IMovie[]) => movie),
      filter((movie: IMovie) => movie.id === this.selectedId)
    );
    return selectedMovie.subscribe(movie => this._selectedMovie.next(movie));
  }

  private newMovie() {
    this._selectedMovie.next({ ...newMovie, id: generateId() });
  }

  loadMovies(p: IParams): Promise<void> {
    this.selectedId = p.selected;
    const isSelected = p.selected !== '';
    return this.moviesService.getMovies().then(res => {
      this.uiStateStore.startAction('Retrieving movies', isSelected);
      if (res) {
        const filtered = res.filter(x => x.title.toLowerCase().includes(p.searchTerm.toLowerCase()));
        this._movies.next(p.searchTerm ? filtered : res);
        this.uiStateStore.endAction('Movies retrieved', isSelected);
        if (isSelected) {
          this.selectedId === 'new' ? this.newMovie() : this.filterSelectedMovie();
        }
      } else {
        this.uiStateStore.endAction('No Movies found', isSelected);
        if (!isSelected) {
          this.snackBar.open('No Movies found. Add a new movie or edit the example to start.', null, this.config);
        } else {
          this.selectedId === 'new' ? this.newMovie() : this.filterSelectedMovie();
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
