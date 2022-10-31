import styled from 'styled-components';
import { PULSE } from 'styles/keyframes';

export const PulseSkeleton = styled.div`
  animation: ${PULSE} 1.75s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  background-color: ${({ theme }) => theme.color.grey[200]}; ;
`;
