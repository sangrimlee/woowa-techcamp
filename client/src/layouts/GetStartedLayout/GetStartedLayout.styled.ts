import styled from 'styled-components';

export const MainWrapper = styled.main`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 2rem 1rem;
`;

export const WelcomeWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transform: translateY(-50%);

  svg {
    margin-bottom: 1rem;
  }
  & > h1 {
    font-size: 1.375rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    margin-bottom: 0.375rem;
  }
  & > p {
    font-size: 1.125rem;
  }
`;
