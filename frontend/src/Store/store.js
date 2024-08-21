import {configureStore} from "@reduxjs/toolkit";
import propertySlice from "./Property/property-slice";
import propertyDetailsSlice from"./PropertyDetails/propertyDetails-slice";
import userslice from"./User/user-slice";
import  paymentSlice from "./Payment/payment-slice";
import bookingSlice from "./Booking/booking-slice";

const store = configureStore({
    reducer: {
        properties: propertySlice.reducer,
        propertydetails: propertyDetailsSlice.reducer,
        user: userslice.reducer,
        payment: paymentSlice.reducer,
        booking: bookingSlice.reducer,
    },
});

export default store;