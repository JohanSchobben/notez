import {Component} from '@angular/core';

@Component({
  selector: 'ntz-dialog-actions',
  template: `
    <ng-content></ng-content>
  `,
  styles: `
    @reference '../../../tailwind.css';
    :host {
      @apply flex justify-end gap-2 p-4;
    }
  `
})
export class DialogActions {}
