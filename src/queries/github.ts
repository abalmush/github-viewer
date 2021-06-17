import { gql } from '@apollo/client';

export const FETCH_REPOS_QUERY = gql`
  query User($login: String!, $cursor: String) {
    user(login: $login) {
      id
      repositories(first: 10, after: $cursor) {
        totalCount
        edges {
          cursor
          node {
            id
            name
            stargazerCount
            forkCount
            description
          }
        }
      }
    }
  }
`;
