import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourseTitle, getCourseFromTitle } from "../../actions/courseAction";
import styles from "../../styles/Layout/coursetitle.module.scss";
import LaptopChromebookIcon from "@material-ui/icons/LaptopChromebook";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import "aos/dist/aos.css";
import AOS from "aos";
const CourseTitle = () => {
  const dispatch = useDispatch();
  const { courseTitle } = useSelector(state => state.courseReducer);

  useEffect(() => {
    dispatch(getCourseTitle());
    
  }, []);
  // console.log(courseTitle)
  return (
    <div>
      <h3 className={styles.courseTitleH3}>
        <FormatListBulletedIcon
          style={{ color: "white" }}
          fontSize="large"
          className="mr-3"
        />
        Danh Mục Khóa Học
      </h3>
      {courseTitle.length !== 0 ? (
        <div className="row">
        {courseTitle.map((item, index) => (
          <div className="col-12" key={index}>
            <div
              style={{ cursor: "pointer" }}
              className={`card mb-3 ${styles.courseTitleCard}`}
              key={index}
              onClick={() => dispatch(getCourseFromTitle(item.maDanhMuc))}
            >
              <div className="card-body">
                <h6 className="card-title mb-0">
                  <LaptopChromebookIcon fontSize="small" className="mr-2" /> {item.tenDanhMuc}
                </h6>
              </div>
            </div>
          </div>
        ))}
      </div>
      ) : (<div>Loading</div>)}
      
    </div>
  );
};
export default CourseTitle;
