import { gql } from 'apollo-angular';

export const GET_ALL_HEROES = gql`
  query GetAllHeroes {
    heroes(order_by: { rating: desc }) {
      gender
      id
      name
      photo
      rating
      species
    }
  }
`;
