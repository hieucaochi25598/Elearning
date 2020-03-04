import React from "react";
import LazyLoad from "react-lazyload";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import {
  getAccountInfo,
  onToggleModal,
  deleteSignUpCourse
} from "../../actions/userActions";
import FormEditAccount from "./FormEditAccount";
import styles from "../../styles/Layout/userdetail.module.scss";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import EmailIcon from "@material-ui/icons/Email";
import StarIcon from "@material-ui/icons/Star";
import { Spinner } from "reactstrap";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import PhoneIcon from "@material-ui/icons/Phone";
import CancelIcon from "@material-ui/icons/Cancel";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GitHubIcon from "@material-ui/icons/GitHub";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import {
  getCourseTitle,
  getCourseListAll,
  getCourseFromTitle
} from "../../actions/courseAction";
import { changeIcon } from "./CourseTitle";
import Swal from "sweetalert2";
import { useState } from "react";
import FormAddMoney from "./FormAddMoney";
export const Loading = () => {
  return (
    <div className="text-center">
      <Spinner style={{ width: "3rem", height: "3rem" }} color="primary" />
    </div>
  );
};
const UserDetail = props => {
  const dispatch = useDispatch();
  const { accountInfo, userInfo } = useSelector(state => state.userReducer);
  const { courseTitle, listCourses } = useSelector(
    state => state.courseReducer
  );
  const [isFetchCourseList, setIsFetchCourseList] = useState(false)
  const [isOpenAddMoney, setIsOpenAddMoney] = useState(false)
  const handleSuccess = () => {
    setIsFetchCourseList(true)
  }
  useEffect(() => {
    dispatch(getCourseTitle());
    dispatch(getCourseListAll(handleSuccess));
  }, []);
  const handleCloseAddMoney = () =>{
    setIsOpenAddMoney(false)
  }
  return (
    <div className={styles.userDetailContainer}>
      <div className="row p-4 ml-0 mr-0">
        <div className={`col-4 ${styles.userDetailDashboard} p-0`}>
          <div>
            <FormAddMoney isOpenAddMoney={isOpenAddMoney} handleCloseAddMoney={handleCloseAddMoney}/>
            <FormEditAccount />
            {Object.keys(accountInfo).length === 0 ? (
              <div>Loading</div>
            ) : (
              <React.Fragment>
                <div className={styles.userInfo}>
                  <AccountCircleIcon className={styles.imgUserInfo} />

                  <h3>{accountInfo.hoTen}</h3>
                  <p className="mb-0">Số dư: ${userInfo.soDu}</p>
                  <div className={styles.userInfoIcons}>
                    <FacebookIcon
                      fontSize="large"
                      className={styles.iconFacebook}
                    />

                    <TwitterIcon
                      fontSize="large"
                      className={styles.iconTwitter}
                    />
                    <GitHubIcon
                      fontSize="large"
                      className={styles.iconGithub}
                    />
                  </div>

                  <Button
                    className={styles.edtButton}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      dispatch(onToggleModal(true));
                    }}
                  >
                    <EditIcon className="mr-1" /> Chỉnh sửa
                  </Button>
                  <Button
                    className={styles.addMoneyButton}
                    variant="contained"
                    color="primary"
                    onClick={() => setIsOpenAddMoney(true)}
                  >
                    <LocalAtmIcon className="mr-1" /> Nạp tiền
                  </Button>
                </div>
                <div className={styles.userInfoPersonal}>
                  <div className="row">
                    <div className="col-6">
                      <h6>
                        <EmailIcon /> Email
                      </h6>
                      <p>{accountInfo.email}</p>
                    </div>
                    <div className="col-6">
                      <h6>
                        <AccountBoxIcon /> Tài khoản
                      </h6>
                      <p>{accountInfo.taiKhoan}</p>
                    </div>
                    <div className="col-6">
                      <h6>
                        <PhoneIcon /> Số điện thoại
                      </h6>
                      <p className="mb-0">{accountInfo.soDT}</p>
                    </div>
                    <div className="col-6">
                      <h6>
                        <SupervisorAccountIcon /> Loại người dùng
                      </h6>
                      <p className="mb-0">{accountInfo.maLoaiNguoiDung}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.userCourseTitle}>
                  <div className="row text-center">
                    {courseTitle.length !== 0 ? (
                      courseTitle.map(item => (
                        <div className="col-4" key={item.maDanhMuc}>
                          <Button
                            className={styles.courseTitleButton}
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              dispatch(getCourseFromTitle(item.maDanhMuc))
                            }
                          >
                            {changeIcon(item.maDanhMuc)} {item.maDanhMuc}
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div>Loading</div>
                    )}
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
        <div className={`col-8 ${styles.userDetailCourses} pr-0 pl-4`}>
          {(isFetchCourseList && listCourses.length !== 0) ? (
            listCourses.map(item => (
              <LazyLoad
                height={100}
                offset={[200, 300]}
                key={item.maKhoaHoc}
                placeholder={<Loading />}
              >
                <React.Fragment key={item.maKhoaHoc}>
                  {accountInfo.chiTietKhoaHocGhiDanh &&
                    accountInfo.chiTietKhoaHocGhiDanh.map(detailItem => (
                      <React.Fragment key={detailItem.maKhoaHoc}>
                        {detailItem.maKhoaHoc === item.maKhoaHoc && (
                          <div
                            className={`bg-white ${styles.userDetailCoursesItem}`}
                            key={item.maKhoaHoc}
                          >
                            <div className="row">
                              <div className="col-3">
                                <div className={styles.divImage}>
                                  <img
                                    className={styles.imageCourse}
                                    src={item.hinhAnh}
                                    alt="images"
                                  />
                                  <div className={styles.divInImage}></div>
                                </div>
                              </div>
                              <div className="col-6">
                                <div
                                  className={styles.userDetailCoursesContent}
                                >
                                  <h5 className="mt-3 mb-0">
                                    {item.tenKhoaHoc}
                                  </h5>
                                  <p className="text-success mb-0">
                                    Cập nhật{" "}
                                    <span>
                                      <strong>{item.ngayTao}</strong>
                                    </span>
                                  </p>
                                  <span className={styles.courseStar}>
                                    <strong className="mr-1 mb-1">5.0</strong>
                                  </span>
                                  <span>
                                    <StarIcon className={styles.courseStar} />
                                  </span>
                                  <span>
                                    <StarIcon className={styles.courseStar} />
                                  </span>
                                  <span>
                                    <StarIcon className={styles.courseStar} />
                                  </span>
                                  <span>
                                    <StarIcon className={styles.courseStar} />
                                  </span>
                                  <span>
                                    <StarIcon className={styles.courseStar} />
                                  </span>
                                  <p className={styles.fullName}>
                                    {item.nguoiTao && item.nguoiTao.hoTen}
                                  </p>
                                  <p className={styles.courseTitle}>
                                    {item.danhMucKhoaHoc &&
                                      item.danhMucKhoaHoc.tenDanhMucKhoaHoc}
                                  </p>
                                </div>
                              </div>
                              <div className="col-3 d-flex align-items-center justify-content-center">
                                <div>
                                  <Button
                                    className={styles.courseDetailButton}
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                      props.history.push(
                                        `/course-detail/${item.maKhoaHoc}`
                                      )
                                    }
                                  >
                                    <ChromeReaderModeIcon className="mr-1" />{" "}
                                    Chi tiết
                                  </Button>
                                  <Button
                                    className={styles.cancleButton}
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                      Swal.fire({
                                        title:
                                          "Hủy đăng ký sẽ mất đi 30% phí của khóa học. Bạn có chắc chắn muốn hủy đăng ký ? ",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "Có",
                                        cancelButtonText: "Không"
                                      }).then(result => {
                                        if (result.value) {
                                          dispatch(
                                            deleteSignUpCourse(item.maKhoaHoc)
                                          );
                                        }
                                      })
                                    }
                                  >
                                    <CancelIcon className="mr-1" /> Hủy đăng ký
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                </React.Fragment>
              </LazyLoad>
            ))
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserDetail;
