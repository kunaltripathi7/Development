import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTotalPrice, getTotalQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';
function CartOverview() {
  // **********Redux recommends to write the calc.logic in the selector func. rather that outside.
  // const x = useSelector((state) =>
  //   state.cart.cart.reduce((sum, item) => sum + item.quantity, 0),
  // );

  const totalCartQuantity = useSelector(getTotalQuantity);
  const totalCartPrice = useSelector(getTotalPrice);
  if (totalCartQuantity === 0) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} Pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
