import { gql } from 'apollo-angular';

export const GET_HEROES_BY_RATING = gql`
  query GET_HEROES_BY_RATING($offset: Int) {
    heroes(order_by: { rating: desc }, offset: $offset, limit: 5) {
      gender
      id
      name
      photo
      rating
      species
    }
  }
`;
