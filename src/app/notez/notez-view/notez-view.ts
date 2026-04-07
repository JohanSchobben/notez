import {Component, computed, ElementRef, HostListener, inject, Signal, signal, viewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {filter, map, Observable, Subject, switchMap, take, tap, throttleTime, withLatestFrom} from 'rxjs';
import {selectNotezById} from '../../notez-explorer/core/notez-explorer.selectors';
import {Note} from '../../shared/models/note';
import {AsyncPipe } from '@angular/common';
import {BaseWidget} from '../../widgets/base-widget/base-widget';
import {Position, Widget, WidgetType} from '../core/models/widget';
import {addWidget, loadWidgets, moveBack, moveForward, moveWidget, removeWidget, updateMeta} from '../core/notez.actions';
import {getContainerHeight, getContainerWidth, getNextElevation, getStartPosition} from '../core/notez.selector';
import {deleteNote, loadNotez} from '../../notez-explorer/core/notez-explorer.actions';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {WIDGET_DEFAULTS, WIDGET_DEFAULTS_ACCESSOR} from '../../widgets/widget-defaults';
import {canRedo, canUndo, getCurrentWidgets} from '../undo-redo/undo-redo.selector';
import {undo, redo} from '../undo-redo/undo-redo.actions';
import {Header} from '../../shared/header/header';
import {NotezControl} from '../notez-control/notez-control';

@Component({
  selector: 'ntz-notez-view',
  imports: [
    AsyncPipe,
    BaseWidget,
    Header,
    NotezControl,
  ],
  templateUrl: './notez-view.html',
  styleUrl: './notez-view.scss',
  providers: [
    { provide: WIDGET_DEFAULTS_ACCESSOR, useValue: WIDGET_DEFAULTS }
  ]
})
export class NotezView {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);
  private readonly widgetDefaults = inject(WIDGET_DEFAULTS_ACCESSOR);
  private readonly widgetBoard = viewChild.required<ElementRef<HTMLDivElement>>("board");
  private readonly widgetMovingPosition = new Subject<{right: number; bottom: number}>()
  private nextElevation = 0;

  protected readonly note$: Observable<Note>;
  protected readonly widgets$: Observable<Widget[]>
  protected readonly canUndo$: Observable<boolean>;
  protected readonly canRedo$: Observable<boolean>;
  protected readonly boardWidth: Signal<number>;
  protected readonly boardHeight: Signal<number>;
  protected readonly dragWidth = signal(0);
  protected readonly dragHeight = signal(0);
  protected readonly startPosition$: Observable<{ x: number; y: number }>;
  protected readonly showDropZone = signal(false);
  protected readonly activeBoardWidth = computed(() => this.boardWidth() + this.dragWidth());
  protected readonly activeBoardHeight = computed(() => this.boardHeight() + this.dragHeight());

  constructor() {
    this.store.dispatch(loadNotez());

    this.route.params
      .pipe(
        takeUntilDestroyed()
      ).subscribe(params => {
        this.store.dispatch(loadWidgets({noteId: +params['id']}));
    });

    this.note$ = this.route.params
      .pipe(
        takeUntilDestroyed(),
        switchMap(params => this.store.select(selectNotezById(params['id']))),
        filter(Boolean)
      );

    this.startPosition$ = this.store.select(getStartPosition);

    this.canUndo$ = this.store.select(canUndo);
    this.canRedo$ = this.store.select(canRedo);

    this.widgets$ = this.store.select(getCurrentWidgets).pipe(map(widgets => widgets ?? []));

    this.store.select(getNextElevation)
      .pipe(
        takeUntilDestroyed()
      ).subscribe(elevation => this.nextElevation = elevation);

    this.boardHeight = this.store.selectSignal(getContainerHeight);
    this.boardWidth = this.store.selectSignal(getContainerWidth);

    this.widgetMovingPosition
      .pipe(
        takeUntilDestroyed(),
        throttleTime(16),
        map(({right, bottom}) => {
          const edgeThreshold = 40;
          const {width, height} = this.widgetBoard().nativeElement.getBoundingClientRect();

          const horizontalResize = width - edgeThreshold < right;
          const verticalResize = height - edgeThreshold < bottom;
          return {horizontalResize, verticalResize}
        }),
        filter(({horizontalResize, verticalResize}) => horizontalResize || verticalResize),
      ).subscribe(({horizontalResize, verticalResize}) => {
        console.log("drag", horizontalResize, verticalResize);
        const board  = this.widgetBoard().nativeElement;
        if (horizontalResize) {
          this.dragWidth.set(this.dragWidth() + 20);
          document.documentElement.scrollLeft += 20;
        }

        if (verticalResize) {
          this.dragHeight.set(this.dragHeight() + 20);
          document.documentElement.scrollTop += 20;
        }
    })
  }

  @HostListener("window:keydown", ["$event"])
  public onKeyDown(event: KeyboardEvent) {
    if (event.key === "d") {
      console.log(this.store.selectSignal(t => t)());
    }
  }

  @HostListener('window:drop', ['$event'])
  public insertFile(event: DragEvent) {
    console.log("drop", event);
    const files = [ ...event.dataTransfer!.items].filter(file => file.kind === 'file');
    if (files.length === 0) return;
    event.preventDefault();
    this.showDropZone.set(false);
    for (const file of files.filter(file => file.type.startsWith('image/'))) {
      const fileObj = file.getAsFile()
      if (!fileObj) continue;
      createImageBitmap(fileObj).then(bitmap => {
        const imageWidth = Math.min(bitmap.width, 400);
        const imageHeight = bitmap.height / (bitmap.width / imageWidth);

        const widget: Widget = {
          type: "image",
          size: {
            width: imageWidth,
            height: imageHeight,
          },
          meta: {
            file: {
              name: fileObj.name,
              type: fileObj.type,
              size: fileObj.size,
              lastModified: fileObj.lastModified,
              webkitRelativePath: fileObj.webkitRelativePath,
              url: URL.createObjectURL(fileObj),
            },
            rotation: 0,
          },
          elevation: this.nextElevation,
          noteId: +this.route.snapshot.params['id'],
          position: {
            x: event.pageX - imageWidth / 2,
            y: event.pageY -  imageHeight / 2,
          }
        }
        this.store.dispatch(addWidget({widget}))
      })
    }
  }

  @HostListener('window:dragover', ['$event'])
  public fileHover(event: DragEvent) {
    const files = [ ...event.dataTransfer!.items].filter(file => file.kind === 'file');
    if (files.length === 0) return;
    event.preventDefault();
    this.showDropZone.set(true);
    if (files.some(file => file.type.startsWith('image/'))) {
      event.dataTransfer!.dropEffect = 'copy';
    } else {
      event.dataTransfer!.dropEffect = 'none';
    }
  }

  @HostListener('window:dragleave')
  public fileLeave() {
    this.showDropZone.set(false);
  }

  protected addWidget(type: WidgetType = "debug") {
    this.startPosition$
      .pipe(
        take(1),
      ).subscribe(position => {
      const widget: Widget = {
        ...this.widgetDefaults[type],
        meta: type === "debug" ? undefined : "Hello World!",
        noteId: +this.route.snapshot.params['id'],
        type: type,
        elevation: this.nextElevation,
        position: position
      } as Widget;
      this.store.dispatch(addWidget({widget}));
    });
  }

  protected updatePosition(widgetId: number, position: Position) {
    this.store.dispatch(moveWidget({widgetId, ...position}));
  }

  protected moveBackward(widget: Widget) {
    this.store.dispatch(moveBack({widget}));
  }

  protected moveForward(widget: Widget) {
    this.store.dispatch(moveForward({widget}));
  }

  protected deleteWidget(widgetId: number) {
    this.store.dispatch(removeWidget({widgetId}));
  }

  protected updateMeta(widgetId: number, meta: any): void {
    this.store.dispatch(updateMeta({widgetId, meta}));
  }

  protected checkExpanding(event: {right: number; bottom: number;}) {
    this.widgetMovingPosition.next(event);
  }

  protected undo(): void {
    this.store.dispatch(undo());
  }

  protected redo(): void {
    this.store.dispatch(redo());
  }

  protected deleteBoard(): void {
    this.store.dispatch(deleteNote({id: this.route.snapshot.params['id']!}));
  }
}
