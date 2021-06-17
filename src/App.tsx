import React from 'react';
import { useQuery } from '@apollo/client';
import { withApollo } from './container';
import { FETCH_REPOS_QUERY } from './queries';

function App() {
  const { loading, error, data } = useQuery(FETCH_REPOS_QUERY, {
    variables: {
      login: process.env.REACT_APP_GITHUB_USER || ''
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="App">
      {JSON.stringify(data)}
    </div>
  );
}

export default withApollo(App);
