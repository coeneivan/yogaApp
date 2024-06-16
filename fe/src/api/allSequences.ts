import gql from "graphql-tag";

export const ALL_SEQUENCES = gql`query allSequences{
  allSequences {
    id
    name
    description
    poses {
      pose {
        id
      }
    }
  }
}`;