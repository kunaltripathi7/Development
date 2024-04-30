import { useSelector } from "react-redux";

function Customer() {
  const customer = useSelector((store) => store.customer.fullName); // do most of the data manipulation in this callback function. || use Selector creates a subscription subscriber rerender when store changes.
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
