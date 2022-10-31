import React, { createContext, useCallback, useContext, useState } from 'react';

interface TabContextObject {
  selectedIndex: number;
  select: (index: number) => void;
}

const TabContenxt = createContext<TabContextObject | null>(null);

function useTabContext(component: string) {
  const context = useContext(TabContenxt);
  if (context === null) {
    throw new Error(`<Tab.${component} /> is missing a parent <Tab /> component.`);
  }
  return context;
}

interface Props {
  children: React.ReactNode;
}

function RootTab({ children }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const select = useCallback(
    (index: number) => {
      setSelectedIndex(index);
    },
    [setSelectedIndex],
  );
  return <TabContenxt.Provider value={{ selectedIndex, select }}>{children}</TabContenxt.Provider>;
}

function List({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul {...props}>{children}</ul>;
}

interface TabProps extends React.HTMLAttributes<HTMLLIElement> {
  tabIndex: number;
}
function Tab({ children, tabIndex, className, ...props }: TabProps) {
  const { selectedIndex, select } = useTabContext('Tab');

  return (
    <li
      {...props}
      onClick={() => select(tabIndex)}
      className={`${className} ${tabIndex === selectedIndex ? 'active' : ''}`}
    >
      {children}
    </li>
  );
}

function Panels({ children }: Props) {
  const { selectedIndex } = useTabContext('Panels');

  return (
    <React.Fragment>
      {React.Children.map(children, (child, index) => (index === selectedIndex ? child : null))}
    </React.Fragment>
  );
}

function Panel({ children }: Props) {
  return <React.Fragment>{children}</React.Fragment>;
}

RootTab.List = List;
RootTab.Tab = Tab;
RootTab.Panels = Panels;
RootTab.Panel = Panel;

export default RootTab;
