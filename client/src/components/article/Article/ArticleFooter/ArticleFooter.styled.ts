import styled from 'styled-components';

export const BottomWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 1rem;
  padding: 0.75rem 1rem 0.75rem 0;
  border-top: 0.5px solid ${({ theme }) => theme.color.grey[200]};
  background-color: ${({ theme }) => theme.color.bg.front}; ;
`;

export const HeartButton = styled.button`
  position: relative;
  padding: 1rem;
  color: ${({ theme }) => theme.color.grey[600]};

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: 1px;
    height: 72%;
    background-color: ${({ theme }) => theme.color.grey[200]};
  }
`;

export const PriceWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  strong {
    font-size: 1.125rem;
  }
  span {
    font-size: 0.75rem;
    font-weight: 700;
    color: ${({ theme }) => theme.color.grey[500]};
  }
`;
