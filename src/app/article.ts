export interface Article {
  id: number;
  title: string;
  category: string;
  writer: string;
  active: boolean;
  last_update: Date;
  minutes: number;
  editing: boolean;

}
