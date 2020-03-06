import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";
import CourseTitle from "./CourseTitle";
import { Formik } from "formik";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { Form } from "reactstrap";
import Skeleton from '@material-ui/lab/Skeleton';
import SubtitlesIcon from "@material-ui/icons/Subtitles";
import DescriptionIcon from "@material-ui/icons/Description";
import { MyTextField } from "./Signup";
import { FormGroup, InputAdornment, CircularProgress } from "@material-ui/core";
import { addToCartAction, calTotalPrice } from "../../actions/userActions";
import style from "../../styles/Layout/courselist.module.scss";
import SearchIcon from "@material-ui/icons/Search";
import StarIcon from "@material-ui/icons/Star";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import "aos/dist/aos.css";
import { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Swal from "sweetalert2";
import useFetchCoursesList from "../../customHook/useFetchCourseList";
import PaginationComponent from "../layout/Pagination";

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const CourseList = props => {
  const {
    listCourses,
    currentPage,
    totalCount,
    onChangePage,
    isFetch
  } = useFetchCoursesList();

  const { isSuccessAdd, userInfo } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  // useEffect(() => {
  //     dispatch(getAccountInfo());
  // }, [userInfo]);
  const loadingCourseList = () => {
    let content = [];
    for (let i = 0; i < 5; i++) {
      content.push(
        <div className="card" key={i}>
          <Skeleton variant="rect" width="100%" height={118} />
          <div className="card-body">
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          </div>
        </div>
      );
    }
    return content
  };
  const [open, setOpen] = useState(false); //Snackbar

  const handleOpenSnack = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleIsLogin = item => {
    if (Object.keys(userInfo).length === 0) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Vui lòng đăng nhập",
        showConfirmButton: true
      });
      props.history.push("/login");
    } else {
      dispatch(addToCartAction(item));
      handleOpenSnack();
      dispatch(calTotalPrice());
    }
  };
  const handleFindCourses = values => {
    if (Object.values(values)[0] !== "") {
      props.history.push(`/result-courses/${values.tenKhoaHoc}`);
    } else {
      return;
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
            Khóa học đã có trong giỏ hàng hoặc đang chờ xét duyệt
          </Alert>
        )}
      </Snackbar>
      <div>
        <div className={style.imgCourseList}>
          <img
            src="./img/imgCourseList.jpg"
            alt="images"
            width="100%"
            height={400}
          />
          <div className={style.findForm}>
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Khóa học mới nhất</h2>
                <p className="card-text">Lorem ipsum dolor sit amet.</p>
                <Formik
                  initialValues={{
                    tenKhoaHoc: ""
                  }}
                  onSubmit={values => handleFindCourses(values)}
                >
                  {({ handleSubmit }) => (
                    <Form className="mb-4" style={{ width: "400px" }}>
                      <FormGroup>
                        <MyTextField
                          name="tenKhoaHoc"
                          type="text"
                          label="Tìm kiếm khóa học"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment
                                position="end"
                                onClick={handleSubmit}
                              >
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.courseListContainer}>
        <h4 className={style.titleCourseList}>Danh sách khóa học</h4>

        <CourseTitle />

        <div>
          <div className={style.courseListItem}>
            {isFetch && listCourses.length !== 0 ? (
              listCourses.map((item, index) => (
                <div
                  className={style.courseListItemCard}
                  key={index}
                  id={"Popover-" + index}
                >
                  <UncontrolledPopover
                    trigger="legacy"
                    placement="right"
                    target={"Popover-" + index}
                  >
                    <PopoverHeader>Khóa Học {item.tenKhoaHoc}</PopoverHeader>
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
                          <DescriptionIcon className="mr-1" /> Xem chi tiết
                        </Button>
                        <Button
                          className={style.myCartButton}
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            handleIsLogin(item);
                          }}
                        >
                          <AddShoppingCartIcon className="mr-1" /> Thêm giỏ hàng
                        </Button>
                      </div>
                    </PopoverBody>
                  </UncontrolledPopover>
                  <div className={`card ${style.courseListCard} border-0`}>
                    <div className={style.divImage}>
                      <img
                        className="card-img-top"
                        src={item.hinhAnh}
                        alt="image"
                        width="100%"
                        height={135}
                      />
                      <div className={style.divInsideImage}></div>
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
                      {item.luotXem === 0 ? (
                        <h5 className="text-right">Free</h5>
                      ) : (
                        <h5 className="text-right">${item.luotXem}</h5>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                {loadingCourseList()}
              </>
            )}
          </div>
          <div className="row justify-content-center mt-4">
            <PaginationComponent
              pageSize={10}
              currentPage={currentPage}
              totalCount={totalCount}
              onChangePage={onChangePage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseList;
