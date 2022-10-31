import styled from 'styled-components';

export const ImageList = styled.ul`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  scroll-snap-type: x mandatory;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0) 25%,
    rgba(0, 0, 0, 0) 75%,
    rgba(0, 0, 0, 0.4) 100%
  );
`;

export const ImageItem = styled.li`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  scroll-snap-stop: always;
  scroll-snap-align: center;

  img {
    display: block;
    object-fit: cover;
  }
`;
