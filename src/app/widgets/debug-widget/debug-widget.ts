import {Component, ElementRef, HostListener, inject, output, signal} from '@angular/core';
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
export class DebugWidget implements WidgetComponent {
  public focused = output<void>();
  public blurred = output<void>();
  protected elementRef = inject(ElementRef);
  protected widget = signal<Widget | undefined>(undefined);

  @HostListener('window:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.blurred.emit();
    } else {
      this.focused.emit();
    }
  }

  setWidget(widget:Widget): void {
    this.widget.set(widget);
  }
}
