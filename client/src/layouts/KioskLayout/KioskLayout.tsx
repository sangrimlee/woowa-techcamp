import React from 'react';
import * as Styled from './KioskLayout.styled';

interface Props {
  children: React.ReactNode;
}

function KioskLayout({ children }: Props) {
  return <Styled.KioskLayoutContainer>{children}</Styled.KioskLayoutContainer>;
}

function Content({ children }: Props) {
  return <Styled.ContentContainer>{children}</Styled.ContentContainer>;
}

function Sidebar({ children, sidebarWidth = '24rem' }: Props & { sidebarWidth?: string }) {
  return <Styled.SidebarContainer $width={sidebarWidth}>{children}</Styled.SidebarContainer>;
}

KioskLayout.Content = Content;
KioskLayout.Sidebar = Sidebar;

export default KioskLayout;
