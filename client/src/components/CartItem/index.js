import React from 'react';

import { removeFromCart, updateCartQuantity } from "../../utils/redux/actions";
import { connect } from "react-redux";

import { idbPromise } from "../../utils/helpers";

const CartItem = (state) => {
 const {item} = state;
  const handleRemoveFromCart = item => {
    state.dispatch(removeFromCart(item._id));
    idbPromise('cart', 'delete', { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
  
    if (value === '0') {
      state.dispatch(removeFromCart(item._id));
    
      idbPromise('cart', 'delete', { ...item });
    } else {
      state.dispatch(updateCartQuantity(item._id, parseInt(value)));
    
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => handleRemoveFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(CartItem);