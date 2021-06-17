import React from 'react';
import { Card, Container } from '@material-ui/core';
import { useGithubRepositoriesQuery } from './hooks';
import RepositoriesList from './components/RepositoriesList';
import Loading from './components/Loading';

function App() {
  const { loading, error } = useGithubRepositoriesQuery();

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  return (
    <Container maxWidth="sm">
      <Card variant="outlined">
        <RepositoriesList />
      </Card>
    </Container>
  );
}

export default App;
