import { gql } from 'apollo-angular';

export const HERO_RATING_MUTATION = gql`
  mutation UpdateRating($id: uuid, $rate: Int) {
    update_heroes(
      where: { id: { _eq: $id }, rating: {} }
      _inc: { rating: $rate }
    ) {
      returning {
        rating
        id
      }
    }
  }
`;
