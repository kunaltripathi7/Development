import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// returns a promise || receives action name & callback
// basically this func. becomes -> action creator
// naming convention -> no get
// returns 3 promise states -> pending , fulfilled etc. need to handle them in the reducers -> connect thunk with redux || on run -> it will fire off user/address/pending dispatch which will do the tasks -> then fulfilled
export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  // this func should return a promise
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    // this data will become the payload of the fulfilled state
    return { position, address };
  },
);

const initialState = {
  username: '',
  position: {},
  error: '',
  address: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  // each individual action prprty is a reducer from which action creators are made by redux
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = 'idle';
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        // error => automatically gets placed on the action
        state.status = 'error';
        state.error = action.error.message;
      }),
});

export const { updateName } = userSlice.actions;
export default userSlice.reducer;

export const getUsername = (state) => state.user.username;
