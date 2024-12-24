import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    lectures: []
}


export const getCourseLectures = createAsyncThunk("/course/lecture/get", async (courseId) => {
    try {
        const response = axiosInstance.get(`/courses/${courseId}`);
        toast.promise(response, {
            loading: "fetching course lectures",
            success: "lectures fetched successfully",
            error: "failed to load lectures"
        });

        return (await response).data;
    } catch(err) {
       toast.error(err?.response?.data?.message);
    }
});



export const addCourseLecture = createAsyncThunk("/course/lecture/add", async (data) => {
    try {
        const formData = new FormData();
        formData.append("lecture", data.lecture);
        formData.append("title", data.title);
        formData.append("description", data.description);

        const response = axiosInstance.post(`/courses/${data.id}`, formData);
        
        toast.promise(response, {
            loading: "adding course lectures",
            success: "lectures added successfully",
            error: "failed to add lectures"
        });

        return (await response).data;
    } catch(err) {
       toast.error(err?.response?.data?.message);
    }
});


export const deleteCourseLecture = createAsyncThunk("/course/lecture/delete", async (data) => {
    try {
        const response = axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);

        toast.promise(response, {
            loading: "deleting course lectures",
            success: "lectures deleted successfully",
            error: "failed to delete the lectures"
        });

        return (await response).data;
    } catch(err) {
       toast.error(err?.response?.data?.message);
    }
});



const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getCourseLectures.fulfilled, (state, action) => {
            console.log(action);
            state.lectures = action?.payload?.lectures;
        })
        .addCase(addCourseLecture.fulfilled, (state, action) => {
            state.lectures = action?.payload?.course?.lectures;
            console.log(action);
        })
    }

})




export default lectureSlice.reducer;