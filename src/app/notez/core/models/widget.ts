
export type WidgetType = 'debug' | 'simple-text' | 'todo' | 'image';

export type Position = {
  x: number;
  y: number;
}

export type Widget = {
  id?: number;
  position: Position;
  elevation: number;
  type: WidgetType;
  meta: any;
  noteId: number;
}
