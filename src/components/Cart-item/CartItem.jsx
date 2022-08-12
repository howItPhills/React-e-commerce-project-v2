import "./cart-item.scss";

const CartItem = ({ cartItem }) => {
  const { imageUrl, name, price, quantity } = cartItem;
  return (
    <div className="cart-item-container">
      <div className="cart-item-image-container">
        <img src={imageUrl} alt="cart-item" className="cart-item-image" />
      </div>
      <div className="item-info">
        <p>{name}</p>
        <p>
          {quantity} x ${price}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
