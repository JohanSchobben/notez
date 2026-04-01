import {Component } from '@angular/core';
import {CdkDialogContainer} from '@angular/cdk/dialog';
import {CdkPortalOutlet} from '@angular/cdk/portal';

@Component({
  selector: 'ntz-dialog-component',
  imports: [
    CdkPortalOutlet
  ],
  templateUrl: './dialog-component.html',
  styles: [
    `
      :host {
        @apply block h-full w-full;
      }
    `
  ]
})
export class DialogComponent extends CdkDialogContainer {

}
