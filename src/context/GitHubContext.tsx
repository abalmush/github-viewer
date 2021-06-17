import React, { useContext, useReducer } from 'react';
import { UserData, Dispatch } from '../types';
import { gitHubReducer } from './gitHubReducer';
import { withApollo } from '../container';

export interface GitHubState extends UserData {
  currentCursor: string;
}

export const initialGitHubData: GitHubState = {
  id: '',
  totalRepositoriesCount: 0,
  repositories: [],
  currentCursor: '',
};

const GitHubStateContext = React.createContext<GitHubState | undefined>(
  undefined
);

const GitHubDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

const GitHubContextProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(gitHubReducer, initialGitHubData);

  return (
    <GitHubStateContext.Provider value={state}>
      <GitHubDispatchContext.Provider value={dispatch}>
        {children}
      </GitHubDispatchContext.Provider>
    </GitHubStateContext.Provider>
  );
};

function useGitHubState(): GitHubState {
  const context = useContext(GitHubStateContext);

  if (context === undefined) {
    throw new Error('useGitHubState must be used within a GitHubProvider');
  }

  return context;
}

function useGitHubDispatch() {
  const context = useContext(GitHubDispatchContext);

  if (context === undefined) {
    throw new Error('useGitHubDispatch must be used within a GitHubProvider');
  }

  return context;
}

function useGitHub(): [GitHubState, Dispatch] {
  return [useGitHubState(), useGitHubDispatch()];
}

const GitHubProvider = withApollo(GitHubContextProvider);

export { GitHubProvider, useGitHub };
