import {
  ApplicationRef,
  Component, ElementRef, HostListener, inject, input, output,
  signal, viewChild,
} from '@angular/core';
import {CdkDrag, CdkDragEnd, CdkDragHandle, CdkDragMove} from '@angular/cdk/drag-drop';
import {Position, Widget} from '../../notez/core/models/widget';
import {deleteWidget} from '../../notez/core/notez.efffects';

@Component({
  selector: 'ntz-base-widget',
  imports: [
    CdkDrag,
    CdkDragHandle,
  ],
  templateUrl: './base-widget.html',
  styleUrl: './base-widget.scss',
})
export class BaseWidget {
  protected appRef = inject(ApplicationRef);
  protected elementRef = inject(ElementRef);
  protected controls = viewChild<ElementRef<HTMLDivElement>>("widgetControls");
  protected widgetElement = viewChild<ElementRef<HTMLDivElement>>("widgetElement");
  protected isFocused = signal(false);

  public widget = input.required<Widget>()
  public moved = output<Position>()
  public removed = output<void>();

  @HostListener('window:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.isFocused.set(false);
    }
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

  protected deleteWidget(): void {
    this.removed.emit();
  }
}
