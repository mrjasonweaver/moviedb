import { Component, Input } from '@angular/core';
import { UiStateStore } from '../../store/uiState/uiState.store';

@Component({
  selector: 'app-debounce-obs-input',
  templateUrl: './debounceObsInput.component.html',
  styleUrls: ['./debounceObsInput.component.css']
})
export class DebounceObsInputComponent {

  constructor(private uiStateStore: UiStateStore) { }

  @Input() inputLabel: string;
  @Input() searchTerm;

  onValueChange(e: KeyboardEvent): void {
    this.uiStateStore.onInputChange(e);
  }
}
