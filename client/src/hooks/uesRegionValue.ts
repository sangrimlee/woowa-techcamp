import { deleteRegion, postRegion } from 'apis/region';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userRegion } from 'recoil/atoms/region.atom';
import { setSelectedRegionLocalStorage } from 'utils/storage.util';
import { currentUserState } from 'recoil/atoms/user.atom';
import { Region } from 'types/user';

export function useRegionValue() {
  const [userState, setUserState] = useRecoilState(currentUserState);
  const { regions } = useRecoilValue(userRegion);

  const addUserRegion = async ({ id, name }: Region) => {
    if (regions.some(({ id: regionId }) => regionId === id)) {
      alert('이미 등록된 동네에요!');
      return;
    }

    const res = await postRegion(id);
    if (res.ok) {
      if (!userState.user) return;

      const newRegions = [...regions, { id, name }];
      setSelectedRegionLocalStorage(id);
      setUserState({
        ...userState,
        user: { ...userState.user, regions: newRegions },
      });
    }
  };

  const deleteUserRegion = async (deleteId: number) => {
    if (regions.length <= 1) {
      alert('동네는 최소 1개 이상 등록되어야합니다.');
      return;
    }

    const result = confirm('정말 삭제하시겠습니까?');
    if (!result) return;
    const res = await deleteRegion(deleteId);

    if (res.ok) {
      if (!userState.user) return;

      const newRegions = regions.filter(({ id }) => id !== deleteId);
      setSelectedRegionLocalStorage(newRegions[0].id);
      setUserState({
        ...userState,
        user: { ...userState.user, regions: newRegions },
      });
    }
  };

  return { addUserRegion, deleteUserRegion };
}
