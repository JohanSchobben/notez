import {Component} from '@angular/core';

@Component({
  selector: 'ntz-dialog-body',
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    @reference '../../../tailwind.css';
    :host {
      @apply block p-4;
    }
  `]
})
export class DialogBody {}
