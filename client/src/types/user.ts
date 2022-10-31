export interface User {
  id: string;
  username: string;
  email: string;
  regions: Region[];
}

export interface Region {
  id: number;
  name: string;
}
