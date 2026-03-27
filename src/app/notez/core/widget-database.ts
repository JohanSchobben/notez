import {inject, Injectable} from '@angular/core';
import {Database} from '../../shared/database/database';
import {exhaustMap, map, Observable, throwError} from 'rxjs';
import {Widget} from './models/widget';

@Injectable({
  providedIn: 'root',
})
export class WidgetDatabase {
  private readonly database = inject(Database);
  private readonly storeName = 'widgets';

  public getWidgetsForNote(noteId: number): Observable<Widget[]> {
    return this.database.getDataWhere(this.storeName, 'by-note-id', noteId)
  }

  public addWidget(widget: Widget): Observable<Widget> {
    return this.database.save(this.storeName, widget);
  }

  public deleteWidget(widgetId: number): Observable<void> {
    return this.database.delete(this.storeName, widgetId);
  }

  public updateWidgetPosition(id: number, x: number, y: number): Observable<Widget> {
    return this.database.getDataById(this.storeName, id)
      .pipe(
        exhaustMap(widget => {
          if (widget === undefined) {
            return throwError(() => new Error(`Widget with id ${id} not found`));
          }
          return this.database.update(this.storeName, {...widget, position: {x, y}});
        })
      );
  }

  public updateMeta(id: number, meta: any): Observable<Widget> {
    return this.database.getDataById(this.storeName, id)
      .pipe(
        exhaustMap(widget => {
          if (widget === undefined) {
            return throwError(() => new Error(`Widget with id ${id} not found`));
          }
          return this.database.update(this.storeName, {...widget, meta});
        })
      );
  }

  public updateElevation(id: number, elevation: number): Observable<Widget> {
    return this.database.getDataById(this.storeName, id)
      .pipe(
        exhaustMap(widget => {
          if (widget === undefined) {
            return throwError(() => new Error(`Widget with id ${id} not found`));
          }
          return this.database.update(this.storeName, {...widget, elevation});
        })
      );

  }

  public updateWidget(widget: Widget): Observable<Widget> {
    return this.database.update(this.storeName, widget);
  }

  public getWidgetAmountsPerNote(): Observable<Record<number, number>> {
    return this.database.getData(this.storeName)
      .pipe(
        map((widgets: Widget[]) => widgets.reduce((acc: Record<number, number>, widget: Widget) => {
          acc[widget.noteId] ??= 0;
          acc[widget.noteId]++;
          return acc;
        }, {} as Record<number, number>))
      )
  }

}
