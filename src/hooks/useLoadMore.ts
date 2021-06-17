import { useLazyQuery } from '@apollo/client';
import { useGitHub } from '../context/GitHubContext';
import { FETCH_REPOS_QUERY } from '../queries';
import { GitHubActions } from '../types';

export default function useLoadMore() {
  const [{ repositories }, dispatch] = useGitHub();
  const lastRenderedItem = repositories.slice(-1);

  const [handler, { loading, error, data }] = useLazyQuery(FETCH_REPOS_QUERY);

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
          totalCount: user.repositories.totalCount,
        },
      });
    }
  }

  return {
    handler,
    repositories,
    loading,
    error,
    data,
    cursor: lastRenderedItem[0].cursor,
  };
}
