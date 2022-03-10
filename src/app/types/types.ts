export interface IDbHeroSnapshotIn {
  id: string;
  name: string;
  species?: string;
  gender?: string;
  birthDay?: string;
  deathDay?: string;
  status?: string;
  actors?: string;
  citizenship?: string;
  photo?: string;
  movies?: string[];
  rating?: number;
}
