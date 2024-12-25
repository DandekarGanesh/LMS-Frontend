import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    courseData: []
}



export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try {
        const res = axiosInstance.get("/courses");

        toast.promise(res, {
            loading: "Getting all Courses..",
            success: (data) => {
                return data?.data?.message;
            },
            error: "unable to fetch courses"
        });

        return (await res).data.courses;

    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});



export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
    try {
        const res = axiosInstance.delete(`/courses/${id}`);

        toast.promise(res, {
            loading: "Deleting Courses..",
            success: "Course deleted Successfully",
            error: "Failed to delete the course"
        });

        return (await res).data;

    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});




export const createNewCourse = createAsyncThunk("/course/create", async (data) => {

    try {
        
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);
      
        const res = axiosInstance.post("/courses", formData);

        toast.promise(res, {
            loading: "Creating Course..",
            success: "Course Created Successfully",
            error: "Failed to create courses"
        });
        
        return (await res).data;

    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});





const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if(action.payload) {
                // console.log(action.payload);
                state.courseData = [...action.payload];
            }
        }) 
    }
});


export default courseSlice.reducer;