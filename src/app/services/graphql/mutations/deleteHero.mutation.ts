import { gql } from 'apollo-angular';

export const DELETE_HERO_MUTATION = gql`
  mutation DeleteHero($id: uuid) {
    delete_heroes(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;
