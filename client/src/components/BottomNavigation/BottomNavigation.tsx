import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from 'components/common/Icon';
import { NAV_LIST } from 'constants/nav-list.constant';
import * as Styled from './BottomNavigation.styled';

export default function BottomNavigation() {
  const location = useLocation();

  return (
    <Styled.BottomNavigationWrapper>
      <Styled.BottomNavigationList>
        {NAV_LIST.map(({ title, icon, to }, index) => (
          <li key={index}>
            <Link to={to}>
              <Icon icon={to === location.pathname ? icon.clicked : icon.unClicked} size={24} />
              {title}
            </Link>
          </li>
        ))}
      </Styled.BottomNavigationList>
    </Styled.BottomNavigationWrapper>
  );
}
