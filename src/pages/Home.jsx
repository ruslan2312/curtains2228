import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Categories, SortPopup, CurtainBlock, CurtainLoadingBlock } from '../components';

import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchCurtains } from '../redux/actions/curtains';
import { addCurtainToCart } from '../redux/actions/cart';

const categoryNames = ['Италия', 'Испания', 'Германия', 'Бюджет', 'Авторские работы'];
const sortItems = [
  { name: 'популярности', type: 'popular', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавит', type: 'name', order: 'asc' },
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ curtains }) => curtains.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ curtains }) => curtains.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  React.useEffect(() => {
    dispatch(fetchCurtains(sortBy, category));
  }, [category, sortBy]);

  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  const handleAddCurtainToCart = (obj) => {
    dispatch({
      type: 'ADD_CURTAIN_CART',
      payload: obj,
    });
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
        <SortPopup
          activeSortType={sortBy.type}
          items={sortItems}
          onClickSortType={onSelectSortType}
        />
      </div>
      <h2 className="content__title">Все шторы</h2>
      <div className="content__items">
        {isLoaded
          ? items.map((obj) => (
              <CurtainBlock
                onClickAddCurtain={handleAddCurtainToCart}
                key={obj.id}
                addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                {...obj}
              />
            ))
          : Array(12)
              .fill(0)
              .map((_, index) => <CurtainLoadingBlock key={index} />)}
      </div>
    </div>
  );
}

export default Home;
