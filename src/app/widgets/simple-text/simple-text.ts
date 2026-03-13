import {
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  OutputEmitterRef,
  signal
} from '@angular/core';
import {WidgetComponent} from '../widgetComponent';
import {Widget} from "../../notez/core/models/widget";
import {WIDGET_ACCESSOR} from '../widget-token';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'ntz-simple-text',
  imports: [
    FormsModule
  ],
  templateUrl: './simple-text.html',
  styleUrl: './simple-text.scss',
  providers: [
    { provide: WIDGET_ACCESSOR, useExisting: SimpleText }
  ]
})
export class SimpleText implements WidgetComponent {
  private elementRef = inject(ElementRef);
  protected _hasFocus = false;
  protected text = signal<string>('');
  public readonly stateChanged = output<void>();
  public readonly metaUpdated = output<any>();
  public readonly widget = input.required<Widget>();

  constructor() {
    effect(() => {
      this.text.set(this.widget().meta as string ?? "");
    });
  }

  @HostListener('window:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    this._hasFocus = this.elementRef.nativeElement.contains(target);
    this.stateChanged.emit();
  }

  public get hasFocus(): boolean {
    return this._hasFocus;
  }

  protected onTextChange(value: string) {
    this.metaUpdated.emit(value);
  }

  protected changeState() {
    this.stateChanged.emit();
  }
}
