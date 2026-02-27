import {Component, ElementRef, HostListener, inject, output, signal} from '@angular/core';
import {WidgetComponent} from '../widgetComponent';
import {WIDGET_ACCESSOR} from '../widget-token';
import {Widget} from '../../notez/core/models/widget';
import {JsonPipe} from '@angular/common';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'ntz-debug-widget',
  imports: [
    JsonPipe
  ],
  templateUrl: './debug-widget.html',
  styleUrl: './debug-widget.scss',
  providers: [
    {
      provide: WIDGET_ACCESSOR,
      useExisting: DebugWidget
    }
  ]
})
export class DebugWidget implements WidgetComponent {
  protected stateChanges = new Subject<void>();
  protected metaUpdated = new Subject<any>();
  protected _hasFocus = false;
  protected elementRef = inject(ElementRef);
  protected widget = signal<Widget | undefined>(undefined);

  public get stateChanged$(): Observable<void> {
    return this.stateChanges.asObservable();
  }

  public get metaUpdated$(): Observable<any> {
    return this.metaUpdated.asObservable();
  }

  public get hasFocus(): boolean {
    return this._hasFocus;
  }

  @HostListener('window:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    this._hasFocus = this.elementRef.nativeElement.contains(target);
    console.log(this._hasFocus)
    this.stateChanges.next();
  }

  setWidget(widget:Widget): void {
    this.widget.set(widget);
  }
}
