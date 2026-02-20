import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {filter, Observable, switchMap, tap} from 'rxjs';
import {selectNotezById} from '../../notez-explorer/core/notez-explorer.selectors';
import {Note} from '../../shared/models/note';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {BaseWidget} from '../../widgets/base-widget/base-widget';
import {Position, Widget, WidgetType} from '../core/models/widget';
import {addWidget, loadWidgets, moveWidget, removeWidget} from '../core/notez.actions';

import {getAllWidgetsForNote} from '../core/notez.selector';
import {loadNotez} from '../../notez-explorer/core/notez-explorer.actions';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'ntz-notez-view',
  imports: [
    AsyncPipe,
    BaseWidget,
    JsonPipe
  ],
  templateUrl: './notez-view.html',
  styleUrl: './notez-view.scss',
})
export class NotezView {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  protected note$: Observable<Note>;
  protected widgets$: Observable<Widget[]>

  constructor() {
    this.store.dispatch(loadNotez());

    this.route.params
      .pipe(
        takeUntilDestroyed()
      ).subscribe(params => {
        this.store.dispatch(loadWidgets({noteId: +params['id']}));
    })

    this.note$ = this.route.params
      .pipe(
        switchMap(params => {
          return this.store.select(selectNotezById(params['id']));
        }),
        filter(Boolean)
      );

    this.widgets$ = this.route.params
      .pipe(
        switchMap(params => {
          return this.store.select(getAllWidgetsForNote(params['id']))
        }),
        tap(widgets => console.log(widgets))
      );
  }

  protected addWidget(type: WidgetType = "debug") {
    const widget: Widget = {
      meta: undefined,
      noteId: +this.route.snapshot.params['id'],
      type: type,
      position: {
        x: 30,
        y: 30
      }
    };
    this.store.dispatch(addWidget({widget}));
  }

  protected updatePosition(widgetId: number, position: Position) {
    this.store.dispatch(moveWidget({widgetId, ...position}));

  }

  protected deleteWidget(widgetId: number) {
    this.store.dispatch(removeWidget({widgetId}));

  }
}
