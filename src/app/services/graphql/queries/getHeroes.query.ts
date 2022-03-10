import { gql } from 'apollo-angular';

export const GET_HEROES = gql`
  {
    heroes {
      id
      name
      gender
      species
      photo
      rating
    }
  }
`;
