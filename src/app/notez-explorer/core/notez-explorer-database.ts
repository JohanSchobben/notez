import {inject, Injectable} from '@angular/core';
import {Database} from '../../shared/database/database';
import {Note} from '../../shared/models/note';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotezExplorerDatabase {
  private readonly database = inject(Database);
  private readonly storeName = 'notez';

  public getAllNotez(): Observable<Note[]> {
    return this.database.getData(this.storeName)
  }

  public saveNote(note: Note): Observable<Note> {
    return this.database.save(this.storeName, note);
  }

  public deleteNote(id: number): Observable<void> {
    return this.database.delete(this.storeName, id);
  }
}
