/* GitHub schema */

export interface RepositoryInfo {
    id: string;
    name: string;
    stargazerCount: number;
    forkCount: number;
    description: string;
}

export interface Repository {
    cursor: string;
    node: RepositoryInfo
}

export interface UserData {
    id: string;
    totalRepositoriesCount: number;
    repositories: Repository[];
}

export interface GitHubDataResponse {
    id: string;
    repositories: {
        totalCount: number;
        edges: Repository[];
    }
}

/* Context Related */

export enum GitHubActions {
    APPEND_GITHUB_REPOSITORIES = 'update gitHub data',
}

export interface Action {
  type: GitHubActions;
  payload: any;
}

export type Dispatch = (action: Action) => void;


export interface GitHubData {
    user: UserData
}  
