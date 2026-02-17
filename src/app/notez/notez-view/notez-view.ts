import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {filter, Observable, switchMap} from 'rxjs';
import {selectNotezById} from '../../notez-explorer/core/notez-explorer.selectors';
import {Note} from '../../shared/models/note';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'ntz-notez-view',
  imports: [
    AsyncPipe
  ],
  templateUrl: './notez-view.html',
  styleUrl: './notez-view.scss',
})
export class NotezView {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  protected note$: Observable<Note>;

  constructor() {
    this.note$ = this.route.params
      .pipe(
        switchMap(params => {
          return this.store.select(selectNotezById(params['id']));
        }),
        filter(Boolean)
      )
  }
}
