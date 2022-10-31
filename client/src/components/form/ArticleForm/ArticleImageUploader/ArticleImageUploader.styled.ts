import styled from 'styled-components';

export const ImageUploaderWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;

  padding: 1.5rem 1rem;

  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const UploadButton = styled.label`
  width: 5rem;
  height: 5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-right: 1rem;
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.color.grey[600]};
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.color.grey[200]};
  cursor: pointer;

  & > span {
    font-size: 0.875rem;
    margin-top: 0.25rem;
    letter-spacing: 0.075em;
  }
`;

export const UploadedImageList = styled.ul`
  display: flex;
  column-gap: 1rem;
`;

export const UploadedImageWrapper = styled.li`
  position: relative;

  width: 5rem;
  height: 5rem;
  border-radius: 0.25rem;

  &:first-child::after {
    content: '대표 사진';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    font-size: 0.875rem;
    letter-spacing: -0.05em;
    padding: 0.125rem 0;
    color: white;
    background-color: rgba(0, 0, 0, 0.75);
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }
`;

export const UploadedImageButton = styled.button`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    border-radius: 0.25rem;
  }
  & > svg {
    color: ${({ theme }) => theme.color.primary};
  }
`;

export const UploadedImageDeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.125rem;
  border-radius: 9999px;
  color: ${({ theme }) => theme.color.grey[50]};
  background-color: ${({ theme }) => theme.color.grey[900]};
  transform: translate(40%, -40%);
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.75;
  }
`;
