import {AfterViewInit, Component, DestroyRef, ElementRef, inject, output, signal, viewChild} from '@angular/core';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {distinctUntilChanged, filter, fromEvent, map, switchMap, take, takeUntil, tap} from 'rxjs';

export type Resize = {horizontal: number, vertical: number};

@Component({
  selector: 'ntz-resize-handle',
  imports: [],
  templateUrl: './resize-handle.html',
  styleUrl: './resize-handle.scss',
})
export class ResizeHandle implements AfterViewInit {
  private readonly resizeHandle = viewChild.required<ElementRef<HTMLDivElement>>('resizeHandle');
  private readonly destroyRef = inject(DestroyRef);

  public readonly resize = output<Resize>()
  public readonly resizeEnd = output<Resize>();

  public ngAfterViewInit(): void {
    const mouseDown$ = fromEvent<MouseEvent>(this.resizeHandle().nativeElement, 'mousedown');
    const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
    const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');

    const resizing$ = mouseDown$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(event => ({x: event.pageX, y: event.pageY})),
        switchMap((start: {x: number, y: number}) => {
          return mouseMove$.pipe(
            takeUntil(mouseUp$),
            takeUntilDestroyed(this.destroyRef),
            tap(() => {
              document.body.style.userSelect = 'none';
            }),
            map(event => {
              const x = event.pageX;
              const y = event.pageY;
              return {horizontal: x - start.x, vertical: y - start.y};
            }),
            distinctUntilChanged((prev, curr) => prev.horizontal === curr.horizontal && prev.vertical === curr.vertical),
            filter(({horizontal, vertical}) => !(horizontal === 0 && vertical === 0))
          );
        })
      )

      resizing$.subscribe(size => {
        this.resize.emit(size);
      });

    resizing$
      .pipe(
        switchMap(({horizontal, vertical}) => mouseUp$.pipe(
          take(1),
          map(() => ({horizontal, vertical})),
          tap(() => {
            document.body.style.userSelect = 'auto';
          }),
        )),
        takeUntilDestroyed(this.destroyRef),
      ).subscribe(size => {
        this.resizeEnd.emit(size);
    })

  }
}
