import { gql } from 'apollo-angular';

export const INSERT_HERO_MUTATION = gql`
  mutation insert_hero_mutation(
    $id: uuid
    $gender: String
    $name: String
    $photo: String
    $species: String
  ) {
    insert_heroes(
      objects: {
        gender: $gender
        id: $id
        name: $name
        photo: $photo
        species: $species
      }
    ) {
      returning {
        id
      }
    }
  }
`;
