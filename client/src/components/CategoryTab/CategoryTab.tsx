import React, { useEffect, useState } from 'react';
import Tab from 'components/common/Tab';
import ProductList from 'components/ProductList';
import { Category } from 'types';
import { requestGetAllCategories } from 'api/product';
import * as Styled from './CategoryTab.styled';

export default function CategoryTab() {
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    (async () => {
      const { data } = await requestGetAllCategories();
      if (data) {
        setCategories(data);
      }
    })();
  }, []);

  return (
    <Tab>
      <Styled.TabList>
        {categories?.map(({ id, name }, index) => (
          <Styled.TabItem key={`tab-${id}`} tabIndex={index}>
            {name}
          </Styled.TabItem>
        ))}
      </Styled.TabList>
      <Tab.Panels>
        {categories?.map(({ id, products }) => (
          <Tab.Panel key={`tab-panel-${id}`}>
            <ProductList products={products} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab>
  );
}
