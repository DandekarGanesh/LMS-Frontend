import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: []
}


export const getRazorpayId = createAsyncThunk("/razorpay/getId", async () => {
    try {
        const res = await axiosInstance.get("/payments/razorpay-key");
        return res.data;

    } catch(error) {
        toast.error("Failed to load data");
    }
});


export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse", async () => {
    try {
        const res = await axiosInstance.post("/payments/subscribe");
        console.log(res);
        return res.data;

    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});


export const verifyUserPayment = createAsyncThunk("/payments/verify", async (data) => {
    
    try {
        const res = await axiosInstance.post("/payments/verify", {
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature
        });
        return res.data;

    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});



export const getPaymentRecord = createAsyncThunk("/payments/record", async () => {
    try {
        const res = axiosInstance.get("/payments?count=100");

        toast.promise(res, {
            loading: "Getting the payment records...",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to get payment records"
        });

        return (await res).data;

    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});



export const cancelCourseBundle = createAsyncThunk("/payments/cancel", async () => {
    try {
        const res = axiosInstance.post("/payments/unsubscribe");

        toast.promise(res, {
            loading: "unSubscribing the Subscription..",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to unsubscribe.."
        });

        return (await res).data;

    } catch(error) {
        toast.error("operation failed!");
    }
});



const razorpaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getRazorpayId.fulfilled, (state, action) => {
            state.key = action?.payload?.key;
        })
        .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
            console.log("inside extra reducer purchaseBundleCourse");
            state.subscription_id = action?.payload?.subscription_id;
        })
        .addCase(verifyUserPayment.fulfilled, (state, action) => {
            toast.success(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.success;
        })
        .addCase(verifyUserPayment.rejected, (state, action) => {
            toast.success(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.success;
        })
        .addCase(getPaymentRecord.fulfilled, (state, action) => {
            console.log("Slice_action  :",action);
            state.allPayments = action?.payload?.subscriptions?.items;
            state.finalMonths = action?.payload?.finalMonths;
            state.monthlySalesRecord = (action?.payload?.monthlySalesRecord || 0 );
        })
        
    }
});



export default razorpaySlice.reducer;