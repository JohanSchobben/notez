export type Note = {
  id?: number;
  title: string;
  description: string | undefined;
  tags: string[] | undefined;
  archived: boolean;
  lastOpenedAt: Date;
  createdAt: Date;
}
