import {
  AfterViewInit, ApplicationRef,
  Component, ComponentRef, computed, createComponent, effect, ElementRef, EnvironmentInjector, HostListener, inject,
  input, inputBinding, output, outputBinding, Signal,
  signal, TemplateRef, Type, viewChild,
} from '@angular/core';
import {CdkDrag, CdkDragEnd, CdkDragHandle, CdkDragMove} from '@angular/cdk/drag-drop';
import {Position, Widget, WidgetType} from '../../notez/core/models/widget';
import {WidgetComponent} from '../widgetComponent';
import {WIDGET_MAP, WIDGET_MAP_ACCESSOR} from '../widget-map';
import {NgComponentOutlet} from '@angular/common';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';

@Component({
  selector: 'ntz-base-widget',
  imports: [
    CdkDrag,
    CdkDragHandle,
  ],
  templateUrl: './base-widget.html',
  styleUrl: './base-widget.scss',
  host: {
    '[style.width.px]': 'widget().size.width',
    '[style.height.px]': 'widget().size.height',
    '[style.display]': '"block"'
  },
  providers: [
    { provide: WIDGET_MAP_ACCESSOR, useValue: WIDGET_MAP }
  ]
})
export class BaseWidget implements AfterViewInit {
  private readonly injector = inject(EnvironmentInjector);
  private readonly appRef = inject(ApplicationRef);
  private readonly hasEnoughAboveSpace = signal(true);
  private readonly controlsHeight = signal(0);
  private readonly isWidgetFocused = signal(false);
  private readonly isControlsFocused = signal(false);
  private readonly widgetMap = inject(WIDGET_MAP_ACCESSOR);
  private readonly controls = viewChild<ElementRef<HTMLDivElement>>("widgetControls");
  private readonly widgetHost = viewChild<ElementRef<HTMLDivElement>>("widgetHost");
  private readonly widgetElement = viewChild.required<ElementRef<HTMLDivElement>>("widgetElement");
  private compRef: ComponentRef<WidgetComponent> | undefined;
  private get componentType(): Type<WidgetComponent> {
    return this.widgetMap[this.widget().type];
  }

  protected readonly isFocused = computed(() => this.isWidgetFocused() || this.isControlsFocused());
  protected readonly controlsPosition = computed(() => {
    return this.hasEnoughAboveSpace() ? {
      top: this.controlsHeight() + "px",
      bottom: "unset",
    } : {
      bottom: this.controlsHeight() + "px",
      top: "unset",
    };
  });

  public readonly widget = input.required<Widget>()
  public readonly moved = output<Position>()
  public readonly removed = output<void>();
  public readonly movedForward = output<void>();
  public readonly movedBackward = output<void>();
  public readonly metaUpdated = output<any>();
  public readonly moving = output<any>();

  @HostListener('window:click', ['$event'])
  public onWindowClick(event: MouseEvent): void {
    const controlsClicked = this.controls()?.nativeElement.contains(event.target as HTMLElement);
    this.isControlsFocused.set(controlsClicked ?? false);
  }

  public ngAfterViewInit(): void {
    this.compRef = createComponent(this.componentType, {
      environmentInjector: this.injector,
      hostElement: this.widgetHost()!.nativeElement as HTMLElement,
      bindings: [
        inputBinding('widget', () => this.widget()),
        outputBinding('stateChanged', () => this.onStateChange()),
        outputBinding('metaUpdated', (data: any) => this.metaUpdated.emit(data)),
      ]
    });
    this.appRef.attachView(this.compRef.hostView);
  }

  protected updatePosition(event: CdkDragEnd): void {
    this.moved.emit(event.source.getFreeDragPosition());
  }

  private onStateChange(): void {
    const focused = this.compRef?.instance.hasFocus ?? false;
    this.isWidgetFocused.set(focused);
    if (focused) {
      this.appRef.tick();
      this.updateControlsPosition();
    }
  }

  private updateControlsPosition(): void {
    const controlsEl = this.controls()?.nativeElement;
    const widgetEl = this.widgetElement()?.nativeElement;
    if (!(controlsEl && widgetEl)) return;

    const { y : widgetY } = widgetEl!.getBoundingClientRect();
    const { height: controlsHeight } = controlsEl!.getBoundingClientRect();
    const heightWithMargin = controlsHeight + 8;
    this.hasEnoughAboveSpace.set(heightWithMargin < widgetY);
    this.controlsHeight.set(heightWithMargin * -1);
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

  protected emitCurrentPosition(event: CdkDragMove<any>) {
    const position = event.source.getFreeDragPosition();
    this.moving.emit({right: position.x + this.widget().size.width, bottom: position.y + this.widget().size.height});
  }
}
