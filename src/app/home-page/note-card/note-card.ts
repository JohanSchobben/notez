import {booleanAttribute, Component, input} from '@angular/core';
import {Note} from '../../shared/models/note';
import {Tag} from '../../shared/tag/tag';
import {TimeAgoPipe} from '../../shared/time-ago-pipe';

@Component({
  selector: 'ntz-note-card',
  imports: [
    Tag,
    TimeAgoPipe
  ],
  templateUrl: './note-card.html',
  styleUrl: './note-card.scss',
})
export class NoteCard {
  note = input.required<Note>()
  narrow = input(false, {transform: booleanAttribute});
}
