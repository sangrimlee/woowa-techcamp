import { atom } from 'recoil';
import { currentUserValue } from 'recoil/selectors/user.selector';
import { User } from 'types/user';

interface CurrentUserState {
  user: User | null;
  isLoggedIn: boolean;
}

export const currentUserState = atom<CurrentUserState>({
  key: 'CurrentUserState',
  default: currentUserValue,
});
