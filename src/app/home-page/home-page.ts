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
  private readonly hours = new Date().getHours();
  protected notes$ = this.store.select(selectAllNotez);
  protected showInput = signal(false);

  public get greeting(): string {
    return this.hours < 6 ? 'Good night' : this.hours < 12 ? 'Good morning' : this.hours < 18 ? 'Good afternoon' : 'Good evening';
  }

  public ngOnInit(): void {
    this.store.dispatch(loadNotez());
  }

  protected createNote(name: string): void {
    this.store.dispatch(createNote({title: name, description: '', tags: []}));
    this.showInput.set(false);
  }

  protected deleteNote(note: Note) {
    this.store.dispatch(deleteNote({id: note.id!}));
  }

  protected openInput() {
    this.showInput.set(!this.showInput());
  }
}
