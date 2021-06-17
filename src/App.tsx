import React from 'react';
import LoadMore from './components/Loading';
import { useGithubRepositoriesQuery } from './hooks';

function App() {
  const { loading, error, data } = useGithubRepositoriesQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="App">
      {JSON.stringify(data)}
      <LoadMore />
    </div>
  );
}

export default App;
