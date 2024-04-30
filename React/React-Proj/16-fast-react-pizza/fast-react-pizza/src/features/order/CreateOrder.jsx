import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  const formErrors = useActionData(); //as this compo is wired up with the action so this hook receives the data returned by the action

  const navigation = useNavigation();
  // console.log(navigation);
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      {/*<Form action="order/new">  action(which route to submit) -> matches to closest route by default* ||||| form working without any js/state/onSubmit*/}
      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Processing" : "Order Now"}
          </button>
        </div>
        {/* Way of sending additional data through form */}
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
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
    priority: data.priority === "on",
    cart: JSON.parse(data.cart),
  };

  const errors = {};
  if (!isValidPhone(updatedData.phone))
    errors.phone =
      "Please Give Correct Phone no. We might need it to contact you";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(updatedData);
  // we send a new response -> react router goest o the url contained in that response
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;

// Here’s why Hooks can’t be used outside of components:
// Contextual Binding: Hooks are bound to a component’s context, which means they need to know which component’s state to modify or which effects to run. Outside of a component, there’s no context to bind to, making it impossible for Hooks to function correctly.
// State Management: Hooks like useState and useEffect manage the state and side effects within a component’s lifecycle. Without being part of a component, they would have no way to manage or clean up after themselves.
