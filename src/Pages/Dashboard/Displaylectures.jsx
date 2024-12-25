import { useEffect, useState } from "react"
import HomeLayout from "../../Layouts/HomeLayout"
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourseLecture, getCourseLectures } from "../../Redux/Slices/LectureSlice";
import { FaPlayCircle } from "react-icons/fa";

function DisplayLectures() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {state} = useLocation();
    const {lectures} = useSelector((state) => state?.lecture);
    const {role} = useSelector((state) => state.auth);

    const [currVideo, setCurrentVideo] = useState(0);

    async function onLectureDelete(courseId, lectureId) {
      console.log(courseId, lectureId);
      await dispatch(deleteCourseLecture({courseId, lectureId}));
      await dispatch(getCourseLectures(courseId));
    }


    useEffect(() => {
        if(!state) navigate("/courses");
        dispatch(getCourseLectures(state?._id));
    }, []);




  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-5"> 
          <div className="text-center text2-xl font-semibold text-yellow-500">
            Course Name : {state?.title}
          </div>

          { 
          
            (lectures && lectures.length > 0) ? 
              ( <div className="flex justify-center gap-10 w-full ">
                {/* Left Section for playing videos and displaying course details to admin */}

                <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                  <video 
                      src={lectures && lectures[currVideo]?.lecture?.secure_url}
                      className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                      controls
                      disablePictureInPicture
                      muted
                      controlsList="nodownload"
                  >
                  
                  </video>

                  <div>
                    <h1>
                      <span className="text-yellow-500"> 
                        Title: {" "}
                      </span>
                      {lectures && lectures[currVideo]?.title}
                    </h1>
                    <p>
                        <span className="text-yellow-500 line-clamp-4 ">
                            Description: {" "}
                        </span>
                        {lectures &&  lectures[currVideo]?.description}
                    </p>
                  </div>
                </div>

                {/* Right section for displaying list of lectures */}
                <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                    <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                      <p> lectures list</p>
                      {role === "ADMIN" && (
                        <button onClick={() => navigate("/course/addlecture", {state: {...state}})} className="bg-blue-300 btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                          Add new lecture
                        </button>
                      )}
                    </li>

                    { lectures && 
                      lectures.map((lecture, idx) => {
                          return (
                            <li key={lecture?._id} className="space-y-2">
                                <p className="cursor-pointer" onClick={() => setCurrentVideo(idx)}>
                                    <span>
                                      {" "}  Lecture {idx+1} : {" "}
                                    </span>
                                    {lecture?.title}
                                </p>
                                {role === "ADMIN" && (
                                  <button onClick={() => onLectureDelete(state?._id, lecture?._id)} className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Delete lecture 
                                  </button>
                                )}
                            </li>
                          )
                      })
                    }
                </ul>
               </div>) : 

              role === "ADMIN" && (
                <button onClick={() => navigate("/course/addlecture", {state: {...state}})} className="bg-blue-300 btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                  Add new lecture
                </button>
              )
            
          }


      </div>
    </HomeLayout>
  )
}




export default DisplayLectures
