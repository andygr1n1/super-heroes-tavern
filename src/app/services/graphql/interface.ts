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
  heroes_aggregate: { aggregate: { count: number } };
}

export interface IUpdateHeroResponse {
  update_heroes: {
    returning: {
      rating: number;
      id: string;
    }[];
  };
}

export interface IInsertNewHeroResponse {
  insert_heroes: {
    returning: {
      id: string;
    }[];
  };
}
