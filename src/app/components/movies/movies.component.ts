import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {

  constructor() { }

  @Input() movies;
  @Input() displayedColumns;
  @Input() loading;
  @Input() selected;

  @Output() selectMovie: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Movie selection
   * @param {string} id The id of a single movie.
   * Event emitted for showing a single movie.
   */
  onSelect(id: string): void {
    this.selectMovie.emit(id);
  }
}
