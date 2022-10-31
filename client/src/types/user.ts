export interface UserData {
  id: string;
  name: string;
  email: string;
  store: {
    id: string;
    storeName: string;
    branchName: string;
  };
}
