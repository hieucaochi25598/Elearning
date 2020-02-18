import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  Spinner,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";
import { getCourseList, findCourse } from "../../actions/courseAction";
import CourseTitle from "./CourseTitle";
import { Formik } from "formik";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { Form } from "reactstrap";
import SubtitlesIcon from "@material-ui/icons/Subtitles";
import DescriptionIcon from "@material-ui/icons/Description";
import { MyTextField } from "./Signup";
import { FormGroup, InputAdornment } from "@material-ui/core";
import {
  addToCartAction,
  calTotalPrice,
  getAccountInfo
} from "../../actions/userActions";
import styles from "../../styles/Layout/coursetitle.module.scss";
import style from "../../styles/Layout/courselist.module.scss";
import SearchIcon from "@material-ui/icons/Search";
import ViewListRoundedIcon from "@material-ui/icons/ViewListRounded";
import StarIcon from "@material-ui/icons/Star";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import "aos/dist/aos.css";
import { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Swal from "sweetalert2";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const CourseList = props => {
  const { listCourses, courseTitle } = useSelector(
    state => state.courseReducer
  );

  const { isSuccessAdd, userInfo } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccountInfo());
    dispatch(getCourseList());
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpenSnack = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleIsLogin = () => {
    if (Object.keys(userInfo).length === 0) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Vui lòng đăng nhập",
        showConfirmButton: true
      });
      props.history.push("/login");
    } else {
      handleOpenSnack();
      dispatch(calTotalPrice());
    }
  };
  return (
    <div className={style.courseList}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        {isSuccessAdd ? (
          <Alert onClose={handleClose} severity="success">
            Thêm giỏ hàng thành công
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error">
            Khóa học đã có trong giỏ hàng
          </Alert>
        )}
      </Snackbar>
      <div className="row">
        <div className="col-4">
          <CourseTitle />
        </div>

        <div className="col-8">
          <div>
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
              {({ handleChange, handleSubmit }) => (
                <Form className="mb-4" style={{ width: "400px" }}>
                  <FormGroup>
                    <MyTextField
                      name="tenKhoaHoc"
                      type="text"
                      label="Tìm kiếm khóa học"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" onClick={handleSubmit}>
                            <SearchIcon
                              fontSize="large"
                              style={{ cursor: "pointer" }}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                  </FormGroup>
                </Form>
              )}
            </Formik>

            <div className="row">
              {listCourses.length !== 0 ? (
                listCourses.map((item, index) => (
                  <div className="col-3" key={index} id={"Popover-" + index}>
                    <div className={`card mb-4 ${style.courseListCard}`}>
                      <div className={style.divImage}>
                        <img
                          className="card-img-top"
                          src={item.hinhAnh}
                          alt="image"
                          width="100%"
                          height={135}
                        />
                        <div className={style.divInsideImage}>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="right"
                            target={"Popover-" + index}
                          >
                            <PopoverHeader>
                              Khóa Học {item.tenKhoaHoc}
                            </PopoverHeader>
                            <PopoverBody>
                              <h6>
                                <DescriptionIcon /> Mô tả
                              </h6>
                              <p>{item.moTa}</p>
                              <h6>
                                <SubtitlesIcon /> Danh mục khóa học
                              </h6>
                              {item.danhMucKhoaHoc && (
                                <p>{item.danhMucKhoaHoc.tenDanhMucKhoaHoc}</p>
                              )}
                              <h6>
                                <CalendarTodayIcon /> Ngày tạo
                              </h6>
                              <p>{item.ngayTao}</p>
                              <div>
                                <Button
                                  className={style.myDetailButton}
                                  variant="contained"
                                  color="primary"
                                  onClick={() =>
                                    props.history.push(
                                      `/course-detail/${item.maKhoaHoc}`
                                    )
                                  }
                                >
                                  <DescriptionIcon className="mr-1" /> Xem chi
                                  tiết
                                </Button>
                                <Button
                                  className={style.myCartButton}
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => {
                                    dispatch(addToCartAction(item));

                                    handleIsLogin();
                                  }}
                                >
                                  <AddShoppingCartIcon className="mr-1" /> Thêm
                                  giỏ hàng
                                </Button>
                              </div>
                            </PopoverBody>
                          </UncontrolledPopover>
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
                        <h5 className="text-right">${item.giaTien}</h5>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>Loading</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseList;
