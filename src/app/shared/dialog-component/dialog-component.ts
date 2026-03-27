import {Component } from '@angular/core';
import {CdkDialogContainer} from '@angular/cdk/dialog';
import {CdkPortalOutlet} from '@angular/cdk/portal';

@Component({
  selector: 'ntz-dialog-component',
  imports: [
    CdkPortalOutlet
  ],
  templateUrl: './dialog-component.html',
  styleUrl: './dialog-component.scss',
})
export class DialogComponent extends CdkDialogContainer {

}
