import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
// import { useStoreContext } from '../../utils/GlobalState';
// import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { addToCart, updateCartQuantity } from "../../utils/redux/actions";
import { connect } from "react-redux";

import { idbPromise } from "../../utils/helpers";

function ProductItem(state, item) {
  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  // const [state, dispatch] = useStoreContext();
  const { cart } = state;

  const handleAddToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      updateCartQuantity( _id, parseInt(itemInCart.purchaseQuantity) + 1 );
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      addToCart( { ...item, purchaseQuantity: 1 });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={handleAddToCart}>Add to cart</button>
    </div>
  );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(ProductItem);
