import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addItem, getQuantitybyId } from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';
import UpdateItem from '../cart/UpdateItem';

function MenuItem({ pizza }) {
  // which item was clicked?? -> prev we used to get it from the html storing the id, now state/prop lives in the compo
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getQuantitybyId(id));
  const isInCart = currentQuantity > 0;

  // whole como is not rerendered if we add one item to cart -> internal redux optimisation. like adding to cart will render only that item.

  function handleAddItem() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalBalance: 1 * unitPrice,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        {/* capitalise -> 1st letter capitalize */}
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {!soldOut &&
            (isInCart ? (
              // use div instead of fragments
              <div className="flex items-center gap-3 sm:gap-8">
                <UpdateItem pizzaId={id} currentQuantity={currentQuantity} />
                <DeleteItem pizzaId={id} />
              </div>
            ) : (
              <Button type="small" onclick={handleAddItem}>
                Add to cart
              </Button>
            ))}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
