import React from 'react';

import { removeFromCart, updateCartQuantity } from "../../utils/redux/actions";
import { connect } from "react-redux";

import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {

  const handleRemoveFromCart = item => {
    removeFromCart(item._id);
    idbPromise('cart', 'delete', { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
  
    if (value === '0') {
      removeFromCart(item._id);
    
      idbPromise('cart', 'delete', { ...item });
    } else {
      updateCartQuantity(item._id, parseInt(value));
    
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

export default connect(CartItem);