import styled from 'styled-components';
import { FADE_IN } from 'styles/keyframes';

export const ProductListContainer = styled.ul`
  width: 100%;
  padding: 2.5rem;

  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;

  animation: ${FADE_IN} 0.25s cubic-bezier(0.455, 0.03, 0.515, 0.955);
`;
