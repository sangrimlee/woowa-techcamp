import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserState } from 'recoil/atoms/user.atom';
import { currentArticleState } from 'recoil/atoms/article.atom';
import { requestGetArticle } from 'apis/article';

export default function useArticleQuery() {
  const { id } = useParams();
  const [article, setArticle] = useRecoilState(currentArticleState(id ?? 0));
  const { user } = useRecoilValue(currentUserState);
  const isMyArticle = useMemo(() => user?.id === article.seller.id, [article, user]);

  const refresh = async () => {
    const newArticle = await requestGetArticle(article.id);
    setArticle(newArticle);
  };

  return { article, isMyArticle, refresh };
}
