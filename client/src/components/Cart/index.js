import React, { useEffect } from "react";
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';

import { toggleCart, addMultipleToCart } from "../../utils/redux/actions";
import { connect } from "react-redux";

import { idbPromise } from "../../utils/helpers";
import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/react-hooks';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = (state) => {
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  function calculateTotal() {
    let sum = 0;
    state.cart.cart.forEach(item => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds }
    });
  }

  function handleToggleCart(){
    state.dispatch(toggleCart());
  }

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      state.dispatch(addMultipleToCart([...cart]));
    };

    if (!state.cart.cart.length) {
      getCart();
    }
    // }, [state.cart.length, dispatch]);
  }, [state.cart.cart.length, state.dispatch]);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  if (!state.cart.cartOpen) {
    return (
      <div className="cart-closed" onClick={handleToggleCart}>
        <span
          role="img"
          aria-label="trash">🛒</span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={handleToggleCart}>[close]</div>
      <h2>Shopping Cart</h2>
      {state.cart.cart.length ? (
        <div>
          {state.cart.cart.map(item => (
            <CartItem key={item._id} item={item} />
          ))}
          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>
            {
              Auth.loggedIn() ?
                <button onClick={submitCheckout}>
                  Checkout
                </button>
                :
                <span>(log in to check out)</span>
            }
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Cart);