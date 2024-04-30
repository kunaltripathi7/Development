import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loanPurpose: "",
  loanAmount: 0,
  balance: 0,
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      // by def only accepts 1 arg
      state.balance += action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        // to customize the action creator
        // way to accept 2 args  -> need to prepare the data before sending.
        return { payload: { amount, purpose } }; // just for convention it returns an obj. later adds a type prprty & returns. || otherwise would have to create a new obj.
      },
      reducer(state, action) {
        if (state.loanAmount > 0) return; // just return instead of returning state.
        state.balance = state.balance + action.payload.amount;
        state.loanAmount = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    payLoan(state, action) {
      if (state.loanAmount > state.balance) return;
      state.balance -= state.loanAmount;
      state.loanAmount = 0;
      state.loanPurpose = "";
    },
  },
});
// console.log(accountSlice); returns obj containing reducer & action creators
export function deposit(amount, currency) {
  // thunk -> middleware func.(action creators) that return function instead of objects which r used for making async ops.
  if (currency === "USD") return { type: "account/deposit", payload: amount }; // just follow the name convention & it will recognize

  return async function (dispatch, getState) {
    dispatch({ type: "account/converting" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;
    dispatch({ type: "account/deposit", payload: converted });
  };
}
export const { requestLoan, payLoan, withdraw } = accountSlice.actions;
console.log(requestLoan(1000, "fdsf")); // action creator returns obj
// 1 sol -> make an obj -> that makes it one arg , 2nd sol -> prepare method

export default accountSlice.reducer;

// export default function accountReducer(state = initialStateAccount, action) {
//   // default reducer || action creators named export
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loanAmount > 0) return state;
//       return {
//         ...state,
//         balance: state.balance + action.payload.amount,
//         loanAmount: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//       };

//     case "account/payLoan":
//       if (state.loanAmount > state.balance) return state;
//       return {
//         ...state,
//         balance: state.balance - state.loanAmount,
//         loanAmount: 0,
//         loanPurpose: "",
//       };
//     case "account/converting":
//       return { ...state, isLoading: true };
//     default:
//       return state;
//   }
// }
// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };

//   return async function (dispatch, getState) {
//     dispatch({ type: "account/converting" });
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     const converted = data.rates.USD;
//     dispatch({ type: "account/deposit", payload: converted });
//   }; // when redux will receive a funct. in dispatch it will know that it will go throught middleware
// }
// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }

// export function requestLoan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { amount, purpose },
//   };
// }

// export function payLoan() {
//   return { type: "account/payLoan" };
// }
