export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type NewDiary = Omit<DiaryEntry, 'id'>;
