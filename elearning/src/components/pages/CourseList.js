import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Spinner } from "reactstrap";
import { getCourseList, findCourse } from "../../actions/courseAction";
import CourseTitle from "./CourseTitle";
import useLoading from "../../customHook/useLoading";
import { Formik } from "formik";
import { Form } from "reactstrap";
import { MyTextField } from "./Signup";
import { FormGroup, InputAdornment } from "@material-ui/core";
import { getAccountInfo } from "../../actions/userActions";
import styles from "../../styles/Layout/coursetitle.module.scss";
import style from "../../styles/Layout/courselist.module.scss";
import SearchIcon from "@material-ui/icons/Search";
import ViewListRoundedIcon from "@material-ui/icons/ViewListRounded";
import StarIcon from "@material-ui/icons/Star";
import Button from "@material-ui/core/Button";
import "aos/dist/aos.css";
import Skeleton from "@material-ui/lab/Skeleton";
import { useState } from "react";
const CourseList = props => {
  const { listCourses, price } = useSelector(state => state.courseReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourseList());
    dispatch(getAccountInfo());
  }, []);

  const [loading, setLoading] = useState(true)

  useEffect(() =>{
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  
  }, [listCourses])
  // const { loading } = useLoading();

  return (
    <div className="container">
      <CourseTitle />
      <h3 className={styles.courseTitleH3}>
        <ViewListRoundedIcon
          style={{ color: "white" }}
          fontSize="large"
          className="mr-3"
        />
        Danh Sách Khóa Học
      </h3>

      <Formik
        initialValues={{
          tenKhoaHoc: ""
        }}
        onSubmit={values => dispatch(findCourse(values.tenKhoaHoc))}
      >
        {({ handleChange, handleSubmit}) => (
          <Form className="mb-4" style={{ width: "400px" }}>
            <FormGroup>
              <MyTextField
                name="tenKhoaHoc"
                type="text"
                label="Tìm kiếm khóa học"
                
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" onClick={handleSubmit}>
                      <SearchIcon fontSize="large" />
                    </InputAdornment>
                  )
                }}
              />
            </FormGroup>
          </Form>
        )}
      </Formik>
      {loading ? (
        // <div className={styles.divSpinner}>
        //   <Spinner color="danger" className={styles.Spinner} />
        // </div>
        <div className="row">
          {listCourses.map((item, index) => (
            <div className="col-3" key={index}>
              <div className={`card mb-4 ${style.courseListCard}`}>
                <Skeleton variant="rect" width="100%" height={135} />
                <div className="card-body">
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="row">
          {listCourses.map((item, index) => (
            <div className="col-3" key={index}>
              <div className={`card mb-4 ${style.courseListCard}`}>
                <div className={style.divImage}>
                  <img
                    className="card-img-top"
                    src={item.hinhAnh}
                    alt
                    width="100%"
                    height={135}
                  />
                  <div className={style.divInsideImage}>
                    <Button
                      className={style.myDetailButton}
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        props.history.push(`/course-detail/${item.maKhoaHoc}`)
                      }
                    >
                      Chi tiết
                    </Button>
                  </div>
                </div>
                <div className="card-body">
                  <h6 className="card-title">{item.tenKhoaHoc}</h6>
                  {item.nguoiTao && (
                    <p className="mb-0">{item.nguoiTao.hoTen}</p>
                  )}

                  <div>
                    <StarIcon className={style.courseStar} />
                    <StarIcon className={style.courseStar} />
                    <StarIcon className={style.courseStar} />
                    <StarIcon className={style.courseStar} />
                    <StarIcon className={style.courseStar} />
                    <span className="ml-2">5.0</span>
                  </div>
                  <h5 className="text-right">
                    ${item.giaTien}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default CourseList;
