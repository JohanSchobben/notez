import {Component, ElementRef, HostListener, inject, input, OnDestroy, OnInit, output, signal} from '@angular/core';
import {WidgetComponent} from '../widgetComponent';
import {WIDGET_ACCESSOR} from '../widget-token';
import {Widget} from '../../notez/core/models/widget';
import {JsonPipe} from '@angular/common';

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
export class DebugWidget implements WidgetComponent, OnInit, OnDestroy {
  public stateChanged = output<void>();
  public metaUpdated = output<any>();
  protected _hasFocus = false;
  protected elementRef = inject(ElementRef);
  public readonly widget = input.required<Widget>();
  private static counter= 0;
  private count = ++DebugWidget.counter;

  constructor() {
    console.log("DebugWidget constructor called", this.count,);
  }

  public ngOnInit(): void {
    console.log("DebugWidget ngOnInit called",  this.count);
  }

  public ngOnDestroy(): void {
    console.log("DebugWidget ngOnDestroy called", this.count);
  }

  public get hasFocus(): boolean {
    return this._hasFocus;
  }

  @HostListener('window:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    this._hasFocus = this.elementRef.nativeElement.contains(target);
    console.log("DebugWidget onClick HostListener", this.count, this._hasFocus)
    this.stateChanged.emit();
  }
}
