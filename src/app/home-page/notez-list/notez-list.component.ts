import {Component, input, output} from '@angular/core';
import {Note} from '../../shared/models/note';
import {RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'ntz-notez-list',
  imports: [
    RouterLink,
    DatePipe
  ],
  templateUrl: './notez-list.component.html',
  styleUrl: './notez-list.component.scss',
})
export class NotezListComponent {
  public readonly notes = input<Note[]>();
  public readonly deleteNote = output<Note>()

  protected deleteCurrentNote(note: Note): void {
    this.deleteNote.emit(note);
  }
}
