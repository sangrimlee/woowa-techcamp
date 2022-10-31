import React from 'react';
import Header from 'components/common/Header';
import Scrollable from 'components/common/Scrollable';
import BottomNavigation from 'components/BottomNavigation/BottomNavigation';

interface MyChatPageLayoutProps {
  children?: React.ReactNode;
}

export default function MyChatPageLayout({ children }: MyChatPageLayoutProps) {
  return (
    <>
      <Header>
        <Header.Inner>
          <Header.Text>채팅</Header.Text>
        </Header.Inner>
      </Header>
      <Scrollable>{children}</Scrollable>
      <BottomNavigation />
    </>
  );
}
