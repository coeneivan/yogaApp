import gql from "graphql-tag";

export const ADD_POSE_TO_SEQUENCE = gql`
  mutation Mutation($data: AddPoseToSequenceInput!) {
    AddPoseToSequence(data: $data) {
      order
      pose {
        id
      }
      sequence {
        id
      }
    }
  }
`;