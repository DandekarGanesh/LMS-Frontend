import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import toast from "react-hot-toast";
import axiosInstance from '../../Helpers/axiosInstance';


const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage?.getItem('data') !== undefined && localStorage?.getItem('data') !== null ? JSON?.parse(localStorage?.getItem('data')) : {}
};


export const createAccount = createAsyncThunk("/auth/signup", async (data) => {

    try {
        const res = axiosInstance.post("user/register", data);

        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account"
        });

        return (await res).data;

    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});



export const login = createAsyncThunk("/auth/login", async (data) => {

    try {
       const res = axiosInstance.post("user/login", data);

       toast.promise(res, {
            loading: "Wait! Login in process",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Login fail!!"
       });

       return (await res).data;

    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});



export const logout =  createAsyncThunk("/auth/logout", async () => {
    try {
        const res = axiosInstance.get("user/logout");

        toast.promise(res, {
            loading: "Wait! Logout in Process...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Logout fail!"
        });

        return (await res).data;

    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});



export const updateProfile =  createAsyncThunk("/user/update/profile", async (data) => {
    try {
        const res = axiosInstance.put(`user/update`, data);


        toast.promise(res, {
            loading: "Wait! Profile update in Process...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to update profile!!"
        });

        return (await res).data;

    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});



export const getUserData =  createAsyncThunk("/user/details", async () => {
    try {
        const res = axiosInstance.get("user/me");
        return (await res).data;
    } catch(error) {
        toast.error(error.message);
    }
});



export const editPassword = createAsyncThunk("/user/editPassword", async (data) => {
    try {
        const res = axiosInstance.post("user/change-password", data);

        toast.promise(res, {
            loading: "Changing Password",
            success: () => {
                toast.success("password changed Successfully!");
            },
            error: (response) => {
                toast.error(response?.response?.data?.message);
            }
        });

        return (await res).data;
    } catch(err) {
        toast.error(err.message);
    }
});




export const forgotPassword = createAsyncThunk("/user/forgotpassword", async (email) => {
    try {
        const res = axiosInstance.post("user/reset", email);

        toast.promise(res, {
            loading: "wait!... forgot password in process..",
            success: "Please Check Your Email",
            error: (response) => {
                toast.error(response?.response?.data?.message);
            }
        });

        return (await res).data;

    } catch(err) {
        toast.error(err.message);
    }
});




export const resetPassword = createAsyncThunk("/user/reset-password", async (data) => {
    try {
        const res = axiosInstance.post(`/user/reset/${data.resetToken}`, data);

        toast.promise(res, {
            loading: "Wait! .. Password resetting...",
            success: "Password Reset Successfully ... Login now..!!",
            error: (response) => {
                toast.error(response?.response?.data?.message);
            }
        });

        return (await res).data;

    } catch(err) {
        toast.error(err.message);
    }
});




const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            // if(action?.payload?.success) {
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                localStorage.setItem("isLoggedIn", action?.payload?.success);
                localStorage.setItem("role", action?.payload?.user?.role);
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role;
            // }
        })
        .addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = "";
        })
        .addCase(getUserData.fulfilled, (state, action) => {
            if(!action?.payload?.user) {
                return;
            }
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
    }
});


export const {} = authSlice.actions;
export default authSlice.reducer;