import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    allUsersCount: 0,
    subscribedCount: 0,
};


export const getStatsData = createAsyncThunk("stats/get", async () => {
    try {
        const res = axiosInstance.get("/admin/stats/users");

        toast.promise(res, {
            loading: "Getting the Stats",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to load data Stats.."
        });

        return (await res).data;

    } catch(err) {
        toast.error(err?.response?.data?.message);
    }
});



const statSlice = createSlice({
    name: "state",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getStatsData.fulfilled, (state, action) => {
            state.allUsersCount = action?.payload?.allUsersCount;
            state.subscribedCount = action?.payload?.subscribedUserCount;
        })

    }
});


export default statSlice.reducer;