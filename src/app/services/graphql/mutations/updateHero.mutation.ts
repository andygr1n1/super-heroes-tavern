import { gql } from 'apollo-angular';

export const UPDATE_HERO_MUTATION = gql`
  mutation UpdateHero(
    $id: uuid
    $gender: String
    $name: String
    $photo: String
    $species: String
  ) {
    update_heroes(
      where: { id: { _eq: $id } }
      _set: { gender: $gender, name: $name, photo: $photo, species: $species }
    ) {
      returning {
        id
      }
    }
  }
`;
