export interface IGetHeroesResponse {
  heroes: [
    {
      id: string;
      name: string;
      gender?: string;
      species?: string;
      photo?: string;
      rating?: number;
    }
  ];
}

export interface IUpdateHeroResponse {
  update_heroes: {
    returning: {
      rating: number;
      id: string;
    }[];
  };
}
