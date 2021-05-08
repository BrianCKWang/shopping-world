import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import ProductItem from "../ProductItem";
import { QUERY_PRODUCTS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif"

// import { useStoreContext } from '../../utils/GlobalState';
// import { UPDATE_PRODUCTS } from '../../utils/actions';
import { updateProducts } from "../../utils/redux/actions";
import { connect } from "react-redux";

import { idbPromise } from "../../utils/helpers";

function ProductList(state) {
  // const [state, dispatch] = useStoreContext();

  const { currentCategory } = state.category;
  
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  
  useEffect(() => {
    if(data) {
      state.dispatch(updateProducts( data.products ));
  
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
      // add else if to check if `loading` is undefined in `useQuery()` Hook
    } else if (!loading) {
      // since we're offline, get all of the data from the `products` store
      idbPromise('products', 'get').then((products) => {
        // use retrieved data to set global state for offline browsing
        state.dispatch(updateProducts( data.products ));
      });
    }
  // }, [data, loading, dispatch]);
}, [data, loading]);
  
  function filterProducts() {
    if (!currentCategory) {
      return state.product.products;
    }
  
    return state.product.products.filter(product => product.category._id === currentCategory);
  }

  console.log()
  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.product?.products?.length ? (
        <div className="flex-row">
            {filterProducts().map(product => (
                <ProductItem
                  key= {product._id}
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                />
            ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      { loading ? 
      <img src={spinner} alt="loading" />: null}
    </div>
  );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(ProductList);
