import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import { QUERY_PRODUCTS } from "../utils/queries";
import spinner from '../assets/spinner.gif'

// import { useStoreContext } from "../utils/GlobalState";
// import {
//   REMOVE_FROM_CART,
//   UPDATE_CART_QUANTITY,
//   ADD_TO_CART,
//   UPDATE_PRODUCTS,
// } from '../utils/actions';
import { 
  updateCartQuantity, 
  addToCart, 
  updateProducts 
} from "../utils/redux/actions";
import { connect } from "react-redux";

import Cart from '../components/Cart';
import { idbPromise } from "../utils/helpers";

function Detail(state) {
  // const [state, dispatch] = useStoreContext();
  const { products, cart } = state;
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({})
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const handleAddToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id)

    if (itemInCart) {
      updateCartQuantity( id, parseInt(itemInCart.purchaseQuantity) + 1);
      // if we're updating quantity, use existing item data and increment purchaseQuantity value by one
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      addToCart( { ...currentProduct, purchaseQuantity: 1 });
      // if product isn't in the cart yet, add it to the current shopping cart in IndexedDB
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  }

  const removeFromCart = () => {
    removeFromCart( currentProduct._id );

    // upon removal from cart, delete the item from IndexedDB using the `currentProduct._id` to locate what to remove
    idbPromise('cart', 'delete', { ...currentProduct });
  };

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));
    }
    // retrieved from server
    else if (data) {
      updateProducts( data.products );

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        updateProducts( data.products );
      });
    }
  // }, [products, data, loading, dispatch, id]);
}, [products, data, loading, id]);

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">
            ← Back to Products
          </Link>

          <h2>{currentProduct.name}</h2>

          <p>
            {currentProduct.description}
          </p>

          <p>
            <strong>Price:</strong>
            ${currentProduct.price}
            {" "}
            <button onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button
              disabled={!cart.find(p => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
      <Cart />
    </>
  );
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Detail);
