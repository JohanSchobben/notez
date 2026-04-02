import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectAllNotez} from '../notez-explorer/core/notez-explorer.selectors';
import {createNote, deleteNote, loadNotez} from '../notez-explorer/core/notez-explorer.actions';
import {Note} from '../shared/models/note';
import {Button} from '../shared/button';
import {NoteCard} from './note-card/note-card';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'ntz-home-page',
  imports: [
    Button,
    NoteCard,
    RouterLink
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
class HomePage implements OnInit {
  private store = inject(Store);
  private readonly hours = new Date().getHours();
  protected readonly notes = this.store.selectSignal(selectAllNotez);
  protected showInput = signal(false);

  protected readonly notesByDate = computed(() => this.notes().sort((a, b) => a.lastOpenedAt.getTime() - b.lastOpenedAt.getTime()));

  public ngOnInit(): void {
    this.store.dispatch(loadNotez());
  }

  protected createNote(): void {

  }

  protected deleteNote(note: Note) {
    this.store.dispatch(deleteNote({id: note.id!}));
  }

  protected openInput() {
    this.showInput.set(!this.showInput());
  }
}

export default HomePage
