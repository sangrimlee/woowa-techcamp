import { requestMyArticles, requestMyLikes, requestMyProfile } from 'apis/user';
import { selector } from 'recoil';

export const currentUserValue = selector({
  key: 'CurrentUserValue',
  get: async () => {
    try {
      const user = await requestMyProfile();
      return {
        user,
        isLoggedIn: true,
      };
    } catch (error) {
      return {
        user: null,
        isLoggedIn: false,
      };
    }
  },
});

export const myArticleListQuery = selector({
  key: 'myArticleListValue',
  get: async () => {
    const myArticles = await requestMyArticles();
    return myArticles;
  },
});

export const myLikeListQuery = selector({
  key: 'myLikeListValue',
  get: async () => {
    const myLikes = await requestMyLikes();
    return myLikes;
  },
});
