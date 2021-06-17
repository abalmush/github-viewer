import { Action, GitHubActions } from '../types';
import { GitHubState } from './GitHubContext';

export function gitHubReducer(state: GitHubState, action: Action): GitHubState {
  switch (action.type) {
    case GitHubActions.APPEND_GITHUB_REPOSITORIES: {
      return {
        ...state,
        totalRepositoriesCount: action.payload.totalCount,
        repositories: [...state.repositories, ...action.payload.edges],
      };
    }

    // other actions

    default: {
      throw new Error(`Unhandled action type: ${JSON.stringify(action)}`);
    }
  }
}
