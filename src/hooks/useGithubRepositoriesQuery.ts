import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { FETCH_REPOS_QUERY } from '../queries';
import { useGitHub } from '../context/GitHubContext';
import { GitHubActions } from '../types';

export default function useGithubRepositoriesQuery() {
    const [, dispatch] = useGitHub();

    const { loading, error, data } = useQuery(FETCH_REPOS_QUERY, {
        variables: {
          login: process.env.REACT_APP_GITHUB_USER || ''
        }
      });
    
      useEffect(() => {
        if (data) {
          const edges = data.user?.repositories?.edges;
    
          dispatch({
            type: GitHubActions.APPEND_GITHUB_REPOSITORIES,
            payload: {
              edges,
              totalCount: data.user?.repositories?.totalCount
            }
          });
        }
      }, [data, dispatch]);

    return {
        loading, error, data
    }
};
