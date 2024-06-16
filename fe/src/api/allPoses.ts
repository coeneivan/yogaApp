import gql from "graphql-tag";

export const ALL_POSES = gql`query allPoses{
  allPoses {
    id
    name
    englishName
    imageUrl
  }
}`;