import {gql} from '@apollo/client';

export const postsByDate = gql`
  query PostsByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        createdAt
        description
        image
        images
        video
        nofComments
        nofLikes
        userID
        User {
          id
          name
          email
          username
          bio
          website
          nofPosts
          nofFollowers
          nofFollowings
          image
          createdAt
          updatedAt
        }
        Likes {
          nextToken
          items {
            id
            User {
              id
              username
            }
          }
        }
        Comments(limit: 2) {
          items {
            id
            comment
            userID
          }
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
