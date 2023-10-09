import {gql} from '@apollo/client';

export const updatePost = gql`
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      nofLikes
      createdAt
      updatedAt
      __typename
    }
  }
`;
