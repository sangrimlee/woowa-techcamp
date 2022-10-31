import styled from 'styled-components';

export const AuthLayoutContainer = styled.main`
  width: 100%;
  height: 100%;
  padding: 5rem 1.5rem;
  overflow-y: auto;
`;

export const AuthLayoutInner = styled.div`
  width: 100%;
  max-width: 28rem;
  margin: auto;
  padding: 3rem 2.5rem 4rem;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 29px 0px;
`;

export const AuthLayoutTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
`;

export const AuthLayoutForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const AuthLayoutFooter = styled.p`
  margin-top: 2.5rem;

  font-size: 0.875rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[600]};

  & > a {
    color: ${({ theme }) => theme.colors.tertiary};
  }

  & > a:hover {
    text-decoration: underline;
  }
`;
