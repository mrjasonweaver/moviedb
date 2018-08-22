import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movie-panel',
  templateUrl: './movie-panel.component.html',
  styleUrls: ['./movie-panel.component.css']
})
export class MoviePanelComponent {

  constructor() { }

  @Input() editData: FormGroup;
  @Output() submitData = new EventEmitter();
  @Output() closePanel = new EventEmitter();

  onSubmitData(formValue) {
    return this.submitData.emit(formValue);
  }
  onClosePanel() {
    return this.closePanel.emit();
  }

}
