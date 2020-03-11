import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/Layout/cartlist.module.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PaymentIcon from "@material-ui/icons/Payment";
import { Button } from "reactstrap";
import "slick-carousel/slick/slick.css"; 
import "../../styles/Component/customize.scss"
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import {
  deleteCart,
  calTotalPrice,
  signUpCourse,
  clearCartAction,
  clearCart,
  addToWishList
} from "../../actions/userActions";
import { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useEffect } from "react";
import Swal from "sweetalert2";
import StarIcon from "@material-ui/icons/Star";
import { getCourseListAll } from "../../actions/courseAction";
import Skeleton from "@material-ui/lab/Skeleton";
const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const settings = {
  dots: false,
  infinite: true,
  speed: 250,
  autoplay: true,
  cssEase: "linear",
  autoplaySpeed: 5000,
  slidesToShow: 5,
  slidesToScroll: 1
};
const loadingCourseList = () => {
  let content = []
  for( let i = 0; i < 5; i++) {
    content.push(

        <div className="card" key={i}>
        <Skeleton variant="rect" width="100%" height={118} />
        <div className="card-body">
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </div>
      </div>
      
    )
  }
  return content;
}
const CartList = props => {
  const { cartArray, totalPrice, userInfo, accountInfo } = useSelector(
    state => state.userReducer
  );
  const { listCourses } = useSelector(state => state.courseReducer);
  const [isOpenSnackBarError, setIsOpenSnackBarError] = useState(false);
  const [isFetchCourseList, setIsFetchCourseList] = useState(false);
  const dispatch = useDispatch();
  const renderCourseList = course => {
    const index = cartArray.findIndex(
      item => item.maKhoaHoc === course.maKhoaHoc
    );
    const indexDetail = accountInfo.chiTietKhoaHocGhiDanh.findIndex(
      itemDetail => itemDetail.maKhoaHoc === course.maKhoaHoc
    );
    if (index === -1 && indexDetail === -1) {
      return (
        <div className="p-2" key={course.maKhoaHoc}>
        <div className={`card ${styles.cardCourses}`}>
          <div className={styles.divImage}>
            <img src={course.hinhAnh} alt="images" width="100%" height={120} />
            <div className={styles.divInsideImage}></div>
            <span className={styles.hotCourse}>BESTSELLER</span>
          </div>

          <div className="card-body">
            <h6 className="card-title">{course.tenKhoaHoc}</h6>
            <p className={`card-text ${styles.inStrucTor} mb-1`}>
              {course.nguoiTao && course.nguoiTao.hoTen}
            </p>
            <div>
              <StarIcon className={styles.iconStar} />
              <StarIcon className={styles.iconStar} />
              <StarIcon className={styles.iconStar} />
              <StarIcon className={styles.iconStar} />
              <StarIcon className={styles.iconStar} />
              <span className={styles.ratingStar}>5.0</span>
            </div>
            {course.luotXem === 0 ? (
              <h5 className="text-right">Free</h5>
            ) : (
              <h5 className="text-right">${course.luotXem}</h5>
            )}
          </div>
        </div>
        </div>
      );
    } else {
      return null;
    }

    // let content = [];
    // const {chiTietKhoaHocGhiDanh} = accountInfo
    // for (let i = 0; i < listCourses.length; i++) {
    //   let isExistCart = false;
    //   let isExistDetailCourse = false;
    //   for (let j = 0; j < cartArray.length; j++) {
    //     if (listCourses[i].maKhoaHoc === cartArray[j].maKhoaHoc) {
    //       isExistCart = true;
    //       break;
    //     }
    //   }
    //   for(let k = 0; k < chiTietKhoaHocGhiDanh.length; k++){
    //     if(listCourses[i].maKhoaHoc === chiTietKhoaHocGhiDanh[k].maKhoaHoc){
    //       isExistDetailCourse = true;
    //       break;
    //     }
    //   }
    //   if (!isExistCart && !isExistDetailCourse) {
    //     content.push(
    //       <div className={`card ${styles.cardCourses}`} key={listCourses[i].maKhoaHoc}>
    //         <div className={styles.divImage}>
    //           <img src={listCourses[i].hinhAnh} alt="images" width="100%" height={120}/>
    //           <div className={styles.divInsideImage}>

    //           </div>
    //           <span className={styles.hotCourse}>
    //             BESTSELLER
    //           </span>
    //         </div>

    //         <div className="card-body">
    //           <h6 className="card-title">{listCourses[i].tenKhoaHoc}</h6>
    //           <p className={`card-text ${styles.inStrucTor} mb-1`}>
    //             {listCourses[i].nguoiTao && listCourses[i].nguoiTao.hoTen}
    //           </p>
    //           <div>
    //               <StarIcon className={styles.iconStar}/>
    //               <StarIcon className={styles.iconStar}/>
    //               <StarIcon className={styles.iconStar}/>
    //               <StarIcon className={styles.iconStar}/>
    //               <StarIcon className={styles.iconStar}/>
    //               <span className={styles.ratingStar}>5.0</span>
    //           </div>
    //     {listCourses[i].luotXem === 0 ? (<h5 className="text-right">Free</h5>) : (<h5 className="text-right">${listCourses[i].luotXem}</h5>)}
    //         </div>
    //       </div>
    //     );
    //   }
    // }
    // return content;
  };
  const handleCheckOut = () => {
    if (userInfo.soDu > totalPrice) {
      for (let i = 0; i < cartArray.length; i++) {
        dispatch(
          signUpCourse(cartArray[i].maKhoaHoc, () =>
            props.history.push("/course-list")
          )
        );
      }
      dispatch(clearCart());
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Thanh toán thành công. Vui lòng chờ xét duyệt!",
        showConfirmButton: false,
        timer: 2500
      });
    } else {
      setIsOpenSnackBarError(true);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsOpenSnackBarError(false);
  };
  useEffect(() => {
    dispatch(
      getCourseListAll(() => {
        setIsFetchCourseList(true);
      })
    );
  }, []);
  return (
    <div className={styles.shoppingCart}>
      <Snackbar
        open={isOpenSnackBarError}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity="error" onClose={handleClose}>
          Số dư trong ví không đủ để thực hiện thanh toán. Vui lòng nạp thêm !
        </Alert>
      </Snackbar>
      <div className={styles.shoppingCartContainer}>
        <div className={styles.shoppingCartContent}>
          <h2 className="mb-0">
            {" "}
            <ShoppingCartIcon fontSize="small" className="mr-2" />
            Giỏ Hàng
          </h2>
        </div>
      </div>
      <div className={styles.cartList}>
      <h5>{cartArray.length} Khóa học trong giỏ hàng</h5>

        {cartArray.length !== 0 ? (
          <div className="row">
            <div className="col-9" style={{overflow: "auto", height: "450px"}}>
              
              <div className={styles.cartListElement}>
                {cartArray.map(item => (
                  <div className="p-2 border" key={item.maKhoaHoc}>
                    <div className="row">
                      <div
                      
                        className={`col-2 ${styles.divImageScale}`}
                        onClick={() =>
                          props.history.push(`/course-detail/${item.maKhoaHoc}`)
                        }
                      >
                        <img
                          src={item.hinhAnh}
                          alt="images"
                          width="100%"
                          height={80}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      <div className="col-6">
                        <h6
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            props.history.push(
                              `/course-detail/${item.maKhoaHoc}`
                            )
                          }
                        >
                          {item.tenKhoaHoc}
                        </h6>
                        <p className="mb-0 text-muted">
                          {item.nguoiTao && item.nguoiTao.hoTen}
                        </p>
                        <p className="mb-0 text-muted">
                          {item.danhMucKhoaHoc &&
                            item.danhMucKhoaHoc.tenDanhMucKhoaHoc}
                        </p>
                      </div>
                      <div className="col-2">
                        <p
                          className={styles.deleteCart}
                          onClick={() => dispatch(deleteCart(item.maKhoaHoc))}
                        >
                          Xóa
                        </p>
                      </div>
                      <div className="col-2">
                        {item.luotXem === 0 ? (
                          <h5>
                            Free
                            <LocalOfferIcon fontSize="small" />
                          </h5>
                        ) : (
                          <h5 className="text-danger">
                            ${item.luotXem}
                            <LocalOfferIcon fontSize="small" className="ml-1" />
                          </h5>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-3">
              <div className={styles.toTalPrice}>
                <h4 className="text-muted">Tổng cộng:</h4>
                <h2>${totalPrice}</h2>
                <Button
                  color="danger"
                  className={styles.btnCheckOut}
                  onClick={() => handleCheckOut()}
                >
                  <PaymentIcon fontSize="small" className="mr-3" />
                  Thanh toán
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.cartEmpty}>
            <div className={`${styles.cartEmptyContent} text-center`}>
              <div>
                <p>
                  <ShoppingCartIcon className={styles.cartEmptyIcon} />
                </p>
                <p>Giỏ hàng đang trống. Hãy mua ngay khóa học dành cho bạn!</p>
                <Button
                  color="danger"
                  className={styles.cartEmptyBtn}
                  onClick={() => props.history.push("/course-list")}
                >
                  Mua ngay
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className={styles.courseListContainer}>
          <h5>Có thể bạn thích</h5>
          <div className={styles.courseList}>
            {/* {isFetchCourseList ? (
              renderCourseList()
            ) : (
              <div>Loading.......</div>
            )} */}
            {Object.keys(accountInfo).length !== 0 &&
            cartArray.length !== 0 &&
            isFetchCourseList ? (
              <Slider {...settings}>
                {listCourses.map(item => (
                  renderCourseList(item)
                ))}
             </Slider>
            ) : (
              <div className={styles.loadingCourses}>{loadingCourseList()}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartList;
