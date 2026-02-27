import {Component, ElementRef, HostListener, inject, output, OutputEmitterRef, signal} from '@angular/core';
import {WidgetComponent} from '../widgetComponent';
import {Widget} from "../../notez/core/models/widget";
import {WIDGET_ACCESSOR} from '../widget-token';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'ntz-simple-text',
  imports: [],
  templateUrl: './simple-text.html',
  styleUrl: './simple-text.scss',
  providers: [
    { provide: WIDGET_ACCESSOR, useExisting: SimpleText }
  ]
})
export class SimpleText implements WidgetComponent {
  private elementRef = inject(ElementRef);
  protected _hasFocus = false;
  protected readonly stateChanges = new Subject<void>();
  protected readonly metaUpdated = new Subject<any>();

  protected readonly widget = signal<Widget | undefined>(undefined);

  @HostListener('window:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    this._hasFocus = this.elementRef.nativeElement.contains(target);
    this.stateChanges.next();
  }

  public get stateChanged$(): Observable<void> {
    return this.stateChanges.asObservable();
  }

  public get metaUpdated$(): Observable<any> {
    return this.metaUpdated.asObservable();
  }

  public get hasFocus(): boolean {
    return this._hasFocus;
  }

  public setWidget(widget: Widget): void {
    this.widget.set(widget);
  }

  protected changeText() {
    this.metaUpdated.next("Text changed");
  }
}
