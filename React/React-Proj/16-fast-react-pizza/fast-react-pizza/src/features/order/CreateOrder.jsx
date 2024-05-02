import { useState, useSyncExternalStore } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, clearCart, getTotalPrice } from '../cart/cartSlice';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import EmptyCart from '../cart/EmptyCart';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);
  const dispatch = useDispatch();
  const priorityPrice = withPriority ? 0.2 * totalPrice : 0;
  const grandTotal = totalPrice + priorityPrice;

  const formErrors = useActionData(); //as this compo is wired up with the action so this hook receives the data returned by the action

  const navigation = useNavigation();
  // console.log(navigation);
  const isSubmitting = navigation.state === 'submitting';
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* it will dispatch the provided action and attach the 3 states */}

      {/*<Form action="order/new">  action(which route to submit) -> matches to closest route by default* ||||| form working without any js/state/onSubmit*/}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            required
            // can edit it not fix
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          {/* how to get an element on top of another element -> wrap in span & position absolute*/}
          {/* only display when there is no position */}
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
              <Button
                type="small"
                onclick={(e) => {
                  // cuz it will submit the form as it is inside the form
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={isLoadingAddress}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />

          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          {/*  */}
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? 'Processing'
              : `Order Now ${formatCurrency(grandTotal)}`}
          </Button>
        </div>
        {/* Way of sending additional data through form */}
        {/* submitting this form -> react router will call this action func by passing the request that was made */}
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData(); // formData contains kv pairs
  const data = Object.fromEntries(formData);
  const updatedData = {
    ...data,
    priority: data.priority === 'true',
    cart: JSON.parse(data.cart),
  };

  const errors = {};
  if (!isValidPhone(updatedData.phone))
    errors.phone =
      'Please Give Correct Phone no. We might need it to contact you';
  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(updatedData);
  // hack -> don't overuse cuz it deactivates redux performance optimisations on this page.
  store.dispatch(clearCart());

  // we send a new response -> react router goest o the url contained in that response
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;

// Here’s why Hooks can’t be used outside of components:
// Contextual Binding: Hooks are bound to a component’s context, which means they need to know which component’s state to modify or which effects to run. Outside of a component, there’s no context to bind to, making it impossible for Hooks to function correctly.
// State Management: Hooks like useState and useEffect manage the state and side effects within a component’s lifecycle. Without being part of a component, they would have no way to manage or clean up after themselves.
