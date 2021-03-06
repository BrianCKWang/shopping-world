import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from "../../utils/queries";

import { updateCategories, updateCurrentCategory } from "../../utils/redux/actions";
import { connect } from "react-redux";

import { idbPromise } from '../../utils/helpers';

function CategoryMenu(state) {
  // const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  // const categories = categoryData?.categories || [];

  // const [state, dispatch] = useStoreContext();
  
  // const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  
  useEffect(() => {
    if (categoryData) {
      state.dispatch(updateCategories( categoryData.categories ));
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        state.dispatch(updateCategories( categoryData.categories ));
      });
    }
  // }, [categoryData, loading, dispatch]);
}, [categoryData, loading, state.dispatch]);

  const handleClick = id => {
    state.dispatch(updateCurrentCategory( id ));
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {state.category?.categories?.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

const mapStateToProps = state => {
  
  return state
};

export default connect(mapStateToProps)(CategoryMenu);
