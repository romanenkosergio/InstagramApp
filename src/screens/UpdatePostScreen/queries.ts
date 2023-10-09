import {gql} from '@apollo/client';

export const getPost = gql`
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      description
      createdAt
      updatedAt
      nofLikes
      nofComments
      userID
      __typename
    }
  }
`;

export const updatePost = gql`
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      description
      createdAt
      updatedAt
      nofLikes
      nofComments
      userID
      __typename
    }
  }
`;
