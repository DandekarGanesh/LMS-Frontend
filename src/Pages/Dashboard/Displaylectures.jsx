import { useEffect } from "react"
import HomeLayout from "../../Layouts/HomeLayout"
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseLectures } from "../../Redux/Slices/LectureSlice";

function DisplayLectures() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {state} = useLocation();
    const {lectures} = useSelector((state) => state.lectures);

    useEffect(async () => {
        console.log(state);
        if(!state) navigate("/courses");
        await dispatch(getCourseLectures(state._id));
    }, []);

  return (
    <HomeLayout>
      
    </HomeLayout>
  )
}

export default DisplayLectures
