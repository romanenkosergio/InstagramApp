/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getLike = /* GraphQL */ `query GetLike($id: ID!) {
  getLike(id: $id) {
    id
    userID
    postID
    User {
      id
      name
      email
      username
      bio
      image
      website
      nofPosts
      nofFollowers
      nofFollowings
      Posts {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    Post {
      id
      createdAt
      type
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
        image
        website
        nofPosts
        nofFollowers
        nofFollowings
        createdAt
        updatedAt
        owner
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      updatedAt
      owner
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetLikeQueryVariables, APITypes.GetLikeQuery>;
export const listLikes = /* GraphQL */ `query ListLikes(
  $filter: ModelLikeFilterInput
  $limit: Int
  $nextToken: String
) {
  listLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userID
      postID
      User {
        id
        name
        email
        username
        bio
        image
        website
        nofPosts
        nofFollowers
        nofFollowings
        createdAt
        updatedAt
        owner
        __typename
      }
      Post {
        id
        createdAt
        type
        description
        image
        images
        video
        nofComments
        nofLikes
        userID
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListLikesQueryVariables, APITypes.ListLikesQuery>;
export const likesByUserID = /* GraphQL */ `query LikesByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelLikeFilterInput
  $limit: Int
  $nextToken: String
) {
  likesByUserID(
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userID
      postID
      User {
        id
        name
        email
        username
        bio
        image
        website
        nofPosts
        nofFollowers
        nofFollowings
        createdAt
        updatedAt
        owner
        __typename
      }
      Post {
        id
        createdAt
        type
        description
        image
        images
        video
        nofComments
        nofLikes
        userID
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.LikesByUserIDQueryVariables,
  APITypes.LikesByUserIDQuery
>;
export const likesForPostByUser = /* GraphQL */ `query LikesForPostByUser(
  $postID: ID!
  $userID: ModelIDKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelLikeFilterInput
  $limit: Int
  $nextToken: String
) {
  likesForPostByUser(
    postID: $postID
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userID
      postID
      User {
        id
        name
        email
        username
        bio
        image
        website
        nofPosts
        nofFollowers
        nofFollowings
        createdAt
        updatedAt
        owner
        __typename
      }
      Post {
        id
        createdAt
        type
        description
        image
        images
        video
        nofComments
        nofLikes
        userID
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.LikesForPostByUserQueryVariables,
  APITypes.LikesForPostByUserQuery
>;
export const getComment = /* GraphQL */ `query GetComment($id: ID!) {
  getComment(id: $id) {
    id
    createdAt
    comment
    userID
    postID
    User {
      id
      name
      email
      username
      bio
      image
      website
      nofPosts
      nofFollowers
      nofFollowings
      Posts {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    Post {
      id
      createdAt
      type
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
        image
        website
        nofPosts
        nofFollowers
        nofFollowings
        createdAt
        updatedAt
        owner
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      updatedAt
      owner
      __typename
    }
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCommentQueryVariables,
  APITypes.GetCommentQuery
>;
export const listComments = /* GraphQL */ `query ListComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
      comment
      userID
      postID
      User {
        id
        name
        email
        username
        bio
        image
        website
        nofPosts
        nofFollowers
        nofFollowings
        createdAt
        updatedAt
        owner
        __typename
      }
      Post {
        id
        createdAt
        type
        description
        image
        images
        video
        nofComments
        nofLikes
        userID
        updatedAt
        owner
        __typename
      }
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCommentsQueryVariables,
  APITypes.ListCommentsQuery
>;
export const commentsByUserID = /* GraphQL */ `query CommentsByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  commentsByUserID(
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      createdAt
      comment
      userID
      postID
      User {
        id
        name
        email
        username
        bio
        image
        website
        nofPosts
        nofFollowers
        nofFollowings
        createdAt
        updatedAt
        owner
        __typename
      }
      Post {
        id
        createdAt
        type
        description
        image
        images
        video
        nofComments
        nofLikes
        userID
        updatedAt
        owner
        __typename
      }
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CommentsByUserIDQueryVariables,
  APITypes.CommentsByUserIDQuery
>;
export const commentsByPost = /* GraphQL */ `query CommentsByPost(
  $postID: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  commentsByPost(
    postID: $postID
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      createdAt
      comment
      userID
      postID
      User {
        id
        name
        email
        username
        bio
        image
        website
        nofPosts
        nofFollowers
        nofFollowings
        createdAt
        updatedAt
        owner
        __typename
      }
      Post {
        id
        createdAt
        type
        description
        image
        images
        video
        nofComments
        nofLikes
        userID
        updatedAt
        owner
        __typename
      }
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CommentsByPostQueryVariables,
  APITypes.CommentsByPostQuery
>;
export const getPost = /* GraphQL */ `query GetPost($id: ID!) {
  getPost(id: $id) {
    id
    createdAt
    type
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
      image
      website
      nofPosts
      nofFollowers
      nofFollowings
      Posts {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    Likes {
      items {
        id
        userID
        postID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    Comments {
      items {
        id
        createdAt
        comment
        userID
        postID
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetPostQueryVariables, APITypes.GetPostQuery>;
export const listPosts = /* GraphQL */ `query ListPosts(
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
      type
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
        image
        website
        nofPosts
        nofFollowers
        nofFollowings
        createdAt
        updatedAt
        owner
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListPostsQueryVariables, APITypes.ListPostsQuery>;
export const postsByDate = /* GraphQL */ `query PostsByDate(
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
      createdAt
      type
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
        image
        website
        nofPosts
        nofFollowers
        nofFollowings
        createdAt
        updatedAt
        owner
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PostsByDateQueryVariables,
  APITypes.PostsByDateQuery
>;
export const postsByUserID = /* GraphQL */ `query PostsByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  postsByUserID(
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      createdAt
      type
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
        image
        website
        nofPosts
        nofFollowers
        nofFollowings
        createdAt
        updatedAt
        owner
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PostsByUserIDQueryVariables,
  APITypes.PostsByUserIDQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    email
    username
    bio
    image
    website
    nofPosts
    nofFollowers
    nofFollowings
    Posts {
      items {
        id
        createdAt
        type
        description
        image
        images
        video
        nofComments
        nofLikes
        userID
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    Comments {
      items {
        id
        createdAt
        comment
        userID
        postID
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    Likes {
      items {
        id
        userID
        postID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      email
      username
      bio
      image
      website
      nofPosts
      nofFollowers
      nofFollowings
      Posts {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const userByUsername = /* GraphQL */ `query UserByUsername(
  $username: String!
  $sortDirection: ModelSortDirection
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  userByUsername(
    username: $username
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      email
      username
      bio
      image
      website
      nofPosts
      nofFollowers
      nofFollowings
      Posts {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserByUsernameQueryVariables,
  APITypes.UserByUsernameQuery
>;
