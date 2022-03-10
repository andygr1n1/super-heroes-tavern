import { gql } from 'apollo-angular';

export const GET_HEROES_BY_RATING = gql`
  {
    heroes(order_by: { rating: desc }) {
      id
      name
      photo
      rating
      species
    }
  }
`;
