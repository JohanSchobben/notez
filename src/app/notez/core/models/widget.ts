
export type WidgetType = 'debug';

export type Position = {
  x: number;
  y: number;
}

export type Widget = {
  id?: number;
  position: Position;
  type: WidgetType;
  meta: any;
  noteId: number;
}
