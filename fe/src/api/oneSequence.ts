import gql from "graphql-tag";

export const ONE_SEQUENCE = gql`query OneSequence($id: Int) {
  oneSequence(id: $id) {
    id
    name 
    description
    poses {
      order
      pose {
        name
        id
        englishName
        imageUrl
      }
    }
  }
}`;