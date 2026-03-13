import {
  AfterViewInit,
  Component,
  computed, DestroyRef, effect,
  ElementRef,
  HostListener, inject,
  input, linkedSignal,
  output,
  signal,
  viewChild
} from '@angular/core';
import {WidgetComponent} from '../widgetComponent';
import {Widget} from "../../notez/core/models/widget";
import {Resize, ResizeHandle} from '../utils/resize-handle/resize-handle';

@Component({
  selector: 'ntz-image',
  imports: [
    ResizeHandle
  ],
  templateUrl: './image.html',
  styleUrl: './image.scss',
})
export class Image implements WidgetComponent {
  protected readonly inFocus = signal(false);
  private readonly imageElement = viewChild.required<ElementRef<HTMLImageElement>>('imageElement');
  public readonly stateChanged = output<void>();
  public readonly metaUpdated = output<any>();
  public readonly widget = input.required<Widget>();
  protected readonly imageSrc = computed(() => this.widget().meta.file.url)
  protected readonly width = linkedSignal(() => this.widget().meta.size.width);
  protected readonly height = linkedSignal(() => this.widget().meta.size.height);


  public get hasFocus(): boolean {
    return this.inFocus();
  }

  @HostListener('window:click', ['$event'])
  public determineFocus(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    this.inFocus.set(target.contains(this.imageElement().nativeElement));
    this.stateChanged.emit();
  }

  private getNewImageSize(resize: Resize): {height: number; width: number} {
    const isHorizontalResize = resize.horizontal > resize.vertical;
    const resizeFactor = isHorizontalResize ? resize.horizontal / this.widget().meta.size.width : resize.vertical / this.widget().meta.size.height;
    const newWidth = this.widget().meta.size.width + this.widget().meta.size.width * resizeFactor;
    const newHeight = this.widget().meta.size.height + this.widget().meta.size.height * resizeFactor;
    return { width: newWidth, height: newHeight };
  }

  protected updateImageSize(resize: Resize) {
    const size = this.getNewImageSize(resize);
    console.log("updateImageSize", resize, size);
    this.height.set(size.height);
    this.width.set(size.width);
  }

  protected storeNewSize(resize: Resize) {
    const size = this.getNewImageSize(resize);

    this.metaUpdated.emit({
      ...this.widget().meta,
      size: {
        width: size.width,
        height: size.height,
      },
    });
  }
}
