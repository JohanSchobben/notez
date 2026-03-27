export type Note = {
  id?: number;
  title: string;
  description: string;
  tags: string[];
  archived: boolean;
  lastOpenedAt: Date;
  createdAt: Date;
}
