import styled from 'styled-components';
import Skeleton from 'components/common/Skeleton';

export const CategoryList = styled.div`
  display: flex;
  column-gap: 0.5rem;
  margin: 0rem 0 1rem;
  padding: 0 1rem;
`;

export const CaetegoryItem = styled(Skeleton)`
  flex-shrink: 0;
  height: 2.125rem;
  border-radius: 9999px;
`;
