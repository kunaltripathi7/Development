import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';
// Router form compo submits & navigate to a new page while this one is a compo which will submit & revalidate the page.

// why new compo -> to include the action

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    // fetcher.form -> RR knows that data has changed so, it refetches the data & rerender without navigating to another page.
    // patch method is used to partially update/modify data on the server
    <fetcher.Form method="PATCH" className="text-right">
      {/*usually we need to send data to action via hidden input fields */}
      <Button type="small">Make Priority</Button>
    </fetcher.Form>
  );
}

// can't update just order.priority cuz props are immutable
// mech to change the global state(priority) via router.
// here's what happens -> button pressed -> http request form submission-> action execute
// what happpended -> prioirty stored on the server -> udpate the server state on some event -> some action req (btn) -> get the form via fetcher -> deploy the action

export default UpdateOrder;

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
