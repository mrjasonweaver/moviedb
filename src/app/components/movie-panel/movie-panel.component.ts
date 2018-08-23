import { Component, Input, Output, EventEmitter } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormArray } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';

import { IMovie } from '../../models/movie/movie.model';

@Component({
  selector: 'app-movie-panel',
  templateUrl: './movie-panel.component.html',
  styleUrls: ['./movie-panel.component.css']
})
export class MoviePanelComponent {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor() { }

  @Input() editData: FormGroup;
  @Input() actors: FormArray;
  @Output() submitData: EventEmitter<FormGroup> = new EventEmitter();
  @Output() addActor: EventEmitter<MatChipInputEvent> = new EventEmitter();
  @Output() removeActor: EventEmitter<string> = new EventEmitter();
  @Output() deleteMovie: EventEmitter<IMovie> = new EventEmitter();

  onSubmitData(formValue: FormGroup): void {
    this.submitData.emit(formValue);
  }

  add(event: MatChipInputEvent): void {
    this.addActor.emit(event);
  }

  remove(actor: string): void {
    this.removeActor.emit(actor);
  }

  delete(movie: IMovie): void {
    this.deleteMovie.emit(movie);
  }

}
