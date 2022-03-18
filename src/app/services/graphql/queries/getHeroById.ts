import { gql } from 'apollo-angular';

export const GET_HERO_BY_ID = gql`
  query GetHeroById($id: uuid) {
    heroes(where: { id: { _eq: $id } }) {
      gender
      id
      name
      photo
      species
    }
  }
`;
