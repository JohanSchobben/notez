import {inject, Injectable} from '@angular/core';
import {DATABASE_NAME, DATABASE_VERSION} from './database-const';
import {fromPromise} from 'rxjs/internal/observable/innerFrom';
import {DBSchema, IDBPDatabase, IDBPTransaction, openDB, StoreNames, StoreValue} from 'idb';
import {exhaustMap, map, Observable} from 'rxjs';
import {Note} from '../models/note';

interface SpreadSheetDB extends DBSchema {
  notez: {
    value: Note,
    key: number;
    indexes: {
      'by-last-modified': Date,
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class Database {
  private readonly name: string = inject(DATABASE_NAME);
  private readonly version: number = inject(DATABASE_VERSION);
  private readonly database$ = fromPromise(openDB(this.name, this.version, {
    upgrade(database: IDBPDatabase<SpreadSheetDB>, oldVersion: number, newVersion: number | null, transaction: IDBPTransaction<SpreadSheetDB, StoreNames<SpreadSheetDB>[], "versionchange">, event: IDBVersionChangeEvent) {
      const spreadsheetsStore = database.createObjectStore("notez", {
        keyPath: "id",
        autoIncrement: true
      });
      spreadsheetsStore.createIndex("by-last-modified", 'lastModified');
    }
  }));

  public getData<Name extends StoreNames<SpreadSheetDB>>(name: Name): Observable<StoreValue<SpreadSheetDB,Name>[]> {
    return this.database$
      .pipe(
        exhaustMap(db => fromPromise(db.getAll(name))),
      );
  }

  public save<Name extends StoreNames<SpreadSheetDB>>(name: Name, data: StoreValue<SpreadSheetDB,Name>): Observable<StoreValue<SpreadSheetDB, Name>> {
    return this.database$
      .pipe(
        exhaustMap(db => fromPromise(db.add(name, data))),
        map(id => {
          return {
            ...data,
            id
          } as StoreValue<SpreadSheetDB, Name>;
        })
      );
  }

  public delete<Name extends StoreNames<SpreadSheetDB>>(name: Name, id: number): Observable<void> {
    return this.database$
      .pipe(
        exhaustMap(db => fromPromise(db.delete(name, id)))
      );
  }


}
