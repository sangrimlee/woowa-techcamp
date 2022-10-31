import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  cursor: pointer;

  &:hover {
    img {
      transform: scale(1.05);
    }
  }
`;

export const ThumbnailContainer = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 0.25rem;
  margin-bottom: 0.375rem;
  overflow: hidden;

  & > img {
    width: 100%;
    object-fit: cover;
    transition: transform 0.2s ease-in;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > h3 {
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.75rem;
    letter-spacing: -0.025em;
    word-break: keep-all;
  }
  & > strong {
    font-size: 1rem;
    font-weight: 700;
  }
`;

export const BadgeContainer = styled.div`
  position: absolute;
  top: -0.75rem;
  left: -0.75rem;
`;

export const Badge = styled.span`
  width: 3rem;
  height: 3rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: ${({ theme }) => theme.colors.primary};
  }

  & > span {
    position: relative;
    color: ${({ theme }) => theme.colors.white};
    font-size: 0.75rem;
    font-weight: 700;
  }
`;
