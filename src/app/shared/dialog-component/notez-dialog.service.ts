import {inject, Injectable} from '@angular/core';
import {Dialog, DialogConfig, DialogRef} from '@angular/cdk/dialog';
import {ComponentType} from '@angular/cdk/portal';
import {DialogComponent} from './dialog-component';

@Injectable({
  providedIn: 'root',
})
export class NotezDialog {
  private readonly dialog = inject(Dialog);

  public open<T = any, C = any>(component: ComponentType<C>, config?: DialogConfig): DialogRef<T> {
    return this.dialog.open<T>(component, {
      container: DialogComponent,
      data: config?.data || null,
      minWidth: '300px',
      width: '800px',
      maxWidth: '1200px',
      minHeight: '300px',
    });
  }

}
