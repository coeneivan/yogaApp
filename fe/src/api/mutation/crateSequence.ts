import gql from "graphql-tag";

export const CREATE_SEQUENCE = gql`
  mutation CreateSequence($data: CreateSequenceInput!) {
    CreateSequence(data: $data) {
      name
      description
    }
  }
`;