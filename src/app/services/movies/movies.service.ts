import { Injectable } from '@angular/core';
import { NgForage } from 'ngforage';

import { IMovie } from '../../models/movie/movie.model';

@Injectable()
export class MoviesService {
  readonly appId = 'moviedb-app-data';
  constructor(private storage: NgForage) {}

  getMovies(): Promise<IMovie[]> {
    return this.storage.getItem(this.appId);
  }

  updateMovies(payload: IMovie[]): Promise<IMovie[]> {
    return this.storage.setItem(this.appId, payload);
  }

  clearMovies(): Promise<void> {
    return this.storage.removeItem(this.appId);
  }

}
