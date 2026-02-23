import {inject, Injectable} from '@angular/core';
import {DATABASE_NAME, DATABASE_VERSION} from './database-const';
import {fromPromise} from 'rxjs/internal/observable/innerFrom';
import {DBSchema, IDBPDatabase, IDBPTransaction, IndexNames, openDB, StoreNames, StoreValue} from 'idb';
import {exhaustMap, map, Observable} from 'rxjs';
import {Note} from '../models/note';
import {Widget} from '../../notez/core/models/widget';

interface SpreadSheetDB extends DBSchema {
  notez: {
    value: Note,
    key: number;
    indexes: {
      'by-last-modified': Date,
    };
  };
  widgets: {
    value: Widget,
    key: number;
    indexes: {
      'by-note-id': number,
    };
  }
}

type IndexName<Name extends StoreNames<SpreadSheetDB>> = keyof SpreadSheetDB[Name]['indexes'] & string;

type IndexValue<Name extends  StoreNames<SpreadSheetDB>, Idx extends IndexName<Name>> = SpreadSheetDB[Name]['indexes'][Idx];

@Injectable({
  providedIn: 'root',
})
export class Database {
  private readonly name: string = inject(DATABASE_NAME);
  private readonly version: number = inject(DATABASE_VERSION);
  private readonly database$ = fromPromise(openDB(this.name, this.version, {
    upgrade(database: IDBPDatabase<SpreadSheetDB>, oldVersion: number, newVersion: number | null, transaction: IDBPTransaction<SpreadSheetDB, StoreNames<SpreadSheetDB>[], "versionchange">, event: IDBVersionChangeEvent) {
      if (!database.objectStoreNames.contains('notez')) {
        const spreadsheetsStore = database.createObjectStore("notez", {
          keyPath: "id",
          autoIncrement: true
        });
        spreadsheetsStore.createIndex("by-last-modified", 'lastModified');
      }
      if (!database.objectStoreNames.contains('widgets')) {
        const widgetsStore = database.createObjectStore("widgets", {
          keyPath: "id",
          autoIncrement: true
        });
        widgetsStore.createIndex("by-note-id", 'noteId');
      }
    }
  }));

  public getData<Name extends StoreNames<SpreadSheetDB>>(name: Name): Observable<StoreValue<SpreadSheetDB,Name>[]> {
    return this.database$
      .pipe(
        exhaustMap(db => fromPromise(db.getAll(name))),
      );
  }

  public getDataById<Name extends StoreNames<SpreadSheetDB>>(name: Name, id: number): Observable<StoreValue<SpreadSheetDB,Name> | undefined> {
    return this.database$
      .pipe(
        exhaustMap(db => fromPromise(db.get(name, id)))
      );
  }

  public getDataWhere<Name extends StoreNames<SpreadSheetDB>, Idx extends IndexName<Name>>(name: Name, index: Idx, value: IndexValue<Name, Idx>): Observable<StoreValue<SpreadSheetDB,Name>[]> {
    return this.database$
      .pipe(
        exhaustMap(db => fromPromise(db.getAllFromIndex(name, index, value as any)))
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

  public update<Name extends StoreNames<SpreadSheetDB>>(name: Name, data: StoreValue<SpreadSheetDB,Name>): Observable<StoreValue<SpreadSheetDB, Name>> {
    return this.database$.pipe(
      exhaustMap(db => fromPromise(db.put(name, data))),
      map(() => {
        return {
          ...data,
        }
      })
    )
  }

  public delete<Name extends StoreNames<SpreadSheetDB>>(name: Name, id: number): Observable<void> {
    return this.database$
      .pipe(
        exhaustMap(db => fromPromise(db.delete(name, id))));
  }


}
