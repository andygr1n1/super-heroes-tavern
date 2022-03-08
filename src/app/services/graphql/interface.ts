export interface IGetHeroesResponse {
  heroes: [
    {
      id: string;
      name: string;
      gender: string;
      species: string;
      photo: string;
    }
  ];
}
