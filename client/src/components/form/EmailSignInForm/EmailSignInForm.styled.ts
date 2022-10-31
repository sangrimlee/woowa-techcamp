import styled from 'styled-components';
import Button from 'components/common/Button';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1.125rem;
`;

export const SignUpParagraph = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.color.grey[600]};

  & > a {
    margin-left: 0.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.color.primary};
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const SocialLoginButton = styled(Button)`
  position: relative;
  svg {
    position: absolute;
    left: 1rem;
  }
`;
