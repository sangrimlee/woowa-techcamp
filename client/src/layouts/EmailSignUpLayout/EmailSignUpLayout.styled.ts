import styled from 'styled-components';

const createSlideAnimation = (step: number) => {
  return new Array(3)
    .fill(undefined)
    .map((_, i) => {
      const isActive = step === i;
      const opacity = Number(isActive);
      return `
      > section:nth-child(${i + 1}) {
        opacity: ${opacity};
      }`;
    })
    .join('');
};

export const Slider = styled.div<{ step: number }>`
  --translate-x-size: ${({ step }) => `${-step * 100}%`};
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: no-wrap;
  transform: translateX(var(--translate-x-size));
  transition: transform 0.3s ease-in-out;
  ${({ step }) => createSlideAnimation(step)};
`;

export const IndicatorWrapper = styled.div`
  margin-bottom: 0.5rem;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  column-gap: 1.25rem;
`;

export const StepIndicatorWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const StepIndicator = styled.p<{ isActive?: boolean }>`
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: ${({ theme, isActive }) => (isActive ? theme.color.primary : theme.color.grey[400])};
  transition: color 0.3s ease-in-out;
`;

export const Indicator = styled.div`
  position: relative;
  width: 100%;
  height: 0.125rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.color.grey[200]};
`;

export const ActiveIndicator = styled.div<{ step: number }>`
  --translate-x-size: ${({ step }) => `calc(${step * 100}% + ${1.25 * step}rem)`};

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.color.primary};
  transform: translateX(var(--translate-x-size));
  transition: transform 0.3s ease-in-out;

  z-index: 1;
`;
