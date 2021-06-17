import React from 'react';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Button } from '@material-ui/core';
import Loading from './Loading';
import useLoadMore from '../hooks/useLoadMore';

const LoadMore: React.FC<{}> = () => {
  const { loading, error, handler, cursor }: any = useLoadMore();

  if (loading) return <Loading />;
  if (error) return <h3>Error</h3>;

  return (
    <Button
      variant="contained"
      color="default"
      aria-label="Load More Repositories"
      title="Load More Repositories"
      onClick={() =>
        handler({
          variables: {
            login: process.env.REACT_APP_GITHUB_USER || '',
            cursor,
          },
        })
      }>
      <GetAppIcon />
    </Button>
  );
};

export default LoadMore;
