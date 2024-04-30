import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      // prepare: function() {} same as this
      prepare(fullName, nationalId) {
        return {
          payload: { fullName, nationalId, createdAt: new Date.toISOString() }, // produces a side effect -> not to be done in a reducer || even if takes a single arg..
          // side effect ->any interaction with the outside world beyond returning a value., async any mutation
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions; // first destructure.
// export {customerSlice.actions.createCustomer} // named exports need to be imported with same name then alias;
export default customerSlice.reducer;

// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalId: action.payload.nationalId,
//         createdAt: action.payload.createAt,
//       };
//     case "customer/updateName":
//       return { ...state, fullName: action.payload };
//     default:
//       return state;
//   }
// }
// export function createCustomer(fullName, nationalId) {
//   return {
//     type: "customer/createCustomer",
//     payload: {
//       fullName,
//       nationalId,
//       createdAt: new Date().toISOString(),
//     },
//   };
// }
// export function updateName(fullName) {
//   return { type: "customer/updateName", payload: fullName };
// }
