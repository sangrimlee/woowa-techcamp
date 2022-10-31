export interface GithubAccessTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

export interface GithubUserResponse {
  id: string;
  node_id: string;
  avata_url: string;
  name: string;
  email: string;
  login: string;
}

export interface GithubUserEmailResponse {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: 'public' | null;
}
