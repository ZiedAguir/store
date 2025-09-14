import { useSelector } from 'react-redux';

const CartV2 = () => {
  const cartV2 = useSelector((state) => state.cartV2);
  const { cartItems, totalPriceAfterDiscount } = cartV2;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity || 0), 0);

  const totalAfterDiscount = totalPriceAfterDiscount || subtotal;

  console.log('Cart Items:', cartItems);
  console.log('Subtotal:', subtotal);
  console.log('Total after discount:', totalAfterDiscount);

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} x ${item.price}
          </li>
        ))}
      </ul>
      <p>Subtotal: ${subtotal}</p>
      <p>Total after discount: ${totalAfterDiscount}</p>
    </div>
  );
};

export default CartV2;