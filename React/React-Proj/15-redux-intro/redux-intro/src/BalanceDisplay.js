import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

function mapStateToProps(state) {
  // does as the name suggests
  return {
    balance: state.account.balance, // name of the prop that our compo should receive
  };
}
export default connect(mapStateToProps)(BalanceDisplay);

// connect is an api which receives a function => that function which will receive a state object and can return anything from the state.
// connect() => will return a new function whose argument will be (balance display) -> this new function will return a component which can receive a prop.

// Basically what it does is connects component to redux store to access the state via props.
