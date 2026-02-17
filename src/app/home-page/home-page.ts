import {Component, inject, signal} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectAllNotez} from '../notez-explorer/core/notez-explorer.selectors';
import {AsyncPipe} from '@angular/common';
import {createNote, deleteNote, loadNotez} from '../notez-explorer/core/notez-explorer.actions';
import {Note} from '../shared/models/note';
import {NotezListComponent} from './notez-list/notez-list.component';
import {Autofocus} from '../shared/autofocus';

@Component({
  selector: 'ntz-home-page',
  imports: [
    AsyncPipe,
    NotezListComponent,
    Autofocus
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private store = inject(Store);
  protected notes$ = this.store.select(selectAllNotez);
  protected showInput = signal(false);

  public ngOnInit(): void {
    this.store.dispatch(loadNotez());
  }

  protected createNote(name: string): void {
    this.store.dispatch(createNote({title: name}));
    this.showInput.set(false);
  }

  protected deleteNote(note: Note) {
    this.store.dispatch(deleteNote({id: note.id!}));
  }

  protected openInput() {
    this.showInput.set(!this.showInput());
  }
}
