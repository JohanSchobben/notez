import {
  AfterViewInit,
  ApplicationRef,
  Component, contentChild, ElementRef, HostListener, inject, input, output,
  signal, viewChild,
} from '@angular/core';
import {CdkDrag, CdkDragEnd, CdkDragHandle, CdkDragMove} from '@angular/cdk/drag-drop';
import {Position, Widget} from '../../notez/core/models/widget';
import {deleteWidget} from '../../notez/core/notez.efffects';
import {moveForward} from '../../notez/core/notez.actions';
import {WidgetComponent} from '../widgetComponent';
import {WIDGET_ACCESSOR} from '../widget-token';

@Component({
  selector: 'ntz-base-widget',
  imports: [
    CdkDrag,
    CdkDragHandle,
  ],
  templateUrl: './base-widget.html',
  styleUrl: './base-widget.scss',
})
export class BaseWidget implements AfterViewInit {
  protected appRef = inject(ApplicationRef);
  protected controls = viewChild<ElementRef<HTMLDivElement>>("widgetControls");
  protected widgetElement = viewChild<ElementRef<HTMLDivElement>>("widgetElement");
  protected widgetComponent = contentChild.required<WidgetComponent>(WIDGET_ACCESSOR);
  protected isFocused = signal(false);

  public widget = input.required<Widget>()
  public moved = output<Position>()
  public removed = output<void>();
  public movedForward = output<void>();
  public movedBackward = output<void>();

  ngAfterViewInit(): void {
    this.widgetComponent().focused.subscribe(() => this.onFocus());
    this.widgetComponent().blurred.subscribe(() => this.isFocused.set(false));
    this.widgetComponent().setWidget(this.widget());
  }


  protected onFocus(): void {
    this.isFocused.set(true);
    this.appRef.tick();
    this.showControls();
  }

  protected updatePosition(event: CdkDragEnd): void {
    this.moved.emit(event.source.getFreeDragPosition());
  }

  private showControls(): void {
    const controlsEl = this.controls()?.nativeElement;
    const widgetEl = this.widgetElement()?.nativeElement;

    if (!(controlsEl && widgetEl)) return;

    const { y : widgetY } = widgetEl!.getBoundingClientRect();
    const { height: controlsHeight } = controlsEl!.getBoundingClientRect();
    const aboveHasSpace = controlsHeight + 8 < widgetY;

    const posStyle = `-${controlsHeight + 8}px`;
    if (aboveHasSpace) {
      controlsEl!.style.top = posStyle;
      controlsEl!.style.bottom = 'unset';
    } else {
      controlsEl!.style.bottom = posStyle;
      controlsEl!.style.top = 'unset';
    }
  }

  protected moveBackward(): void {
    this.movedBackward.emit();
  }

  protected moveForward(): void {
    this.movedForward.emit();
  }

  protected deleteWidget(): void {
    this.removed.emit();
  }
}
