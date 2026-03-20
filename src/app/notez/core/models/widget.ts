
export type WidgetType = 'debug' | 'simple-text' | 'todo' | 'image';

export type Position = {
  x: number;
  y: number;
}

export type Size = {
  width: number;
  height: number;
}

export type Widget<T = any> = {
  id?: number;
  position: Position;
  size: Size;
  elevation: number;
  type: WidgetType;
  meta: T;
  noteId: number;
}
