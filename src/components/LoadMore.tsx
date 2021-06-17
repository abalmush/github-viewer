import React from 'react';
import { useLazyQuery } from '@apollo/client';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Button } from '@material-ui/core';
import { useGitHub } from '../context/GitHubContext';
import { FETCH_REPOS_QUERY } from '../queries';
import { GitHubActions } from '../types';
import Loading from './Loading';

const LoadMore: React.FC<{}> = () => {
    const [{ repositories }, dispatch] = useGitHub();
    const lastRenderedItem = repositories.slice(-1);
  
    const [LoadMoreHandler, { loading, error, data }] = useLazyQuery(FETCH_REPOS_QUERY);
    
    if (loading) return <Loading />
    if (error) return <h3>Error</h3>

    if (data) {
        const { user } = data;
        const fetchedItem = user.repositories.edges.slice(-1);

        if (!fetchedItem || !fetchedItem.length) {
            return null;
        }

        if (fetchedItem[0].cursor !== lastRenderedItem[0].cursor) {
          dispatch({
            type: GitHubActions.APPEND_GITHUB_REPOSITORIES,
            payload: {
                edges: [...user.repositories.edges],
                totalCount: user.repositories.totalCount
            }
          })
        }
    }

    return (
        <Button
            variant="contained"
            color="default"
            aria-label="Load More Repositories"
            title="Load More Repositories"
            onClick={() => LoadMoreHandler({
            variables: {
                login: process.env.REACT_APP_GITHUB_USER || '',
                cursor: lastRenderedItem[0].cursor
            }
            })}
        >
            <GetAppIcon />
        </Button>
    );
};

export default LoadMore;
