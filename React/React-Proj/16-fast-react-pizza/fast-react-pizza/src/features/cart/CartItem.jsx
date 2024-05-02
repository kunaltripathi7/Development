import DeleteItem from './DeleteItem';
import { formatCurrency } from '../../utils/helpers';
import UpdateItem from './UpdateItem';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalBalance } = item;
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {/* margin reset on small breakpoint */}
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalBalance)}</p>
        <UpdateItem pizzaId={pizzaId} currentQuantity={quantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
