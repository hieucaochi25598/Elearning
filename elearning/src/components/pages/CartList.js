import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/Layout/cartlist.module.scss";

import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PaymentIcon from '@material-ui/icons/Payment';
import { Button } from "reactstrap";
import { deleteCart, calTotalPrice, signUpCourse, clearCartAction } from "../../actions/userActions";
import { useState } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const CartList = (props) => {
  const { cartArray,totalPrice, userInfo } = useSelector(state => state.userReducer);
  const [isOpenSnackBarError, setIsOpenSnackBarError] = useState(false)
  const dispatch = useDispatch();
  const handleCheckOut = () => {
    if(userInfo.soDu > totalPrice){
      for(let i = 0; i < cartArray.length; i++){
        dispatch(signUpCourse(cartArray[i].maKhoaHoc, () => props.history.push("/course-list")))
      }
      dispatch(clearCartAction())
    }
    else{
      setIsOpenSnackBarError(true)
    }
    
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpenSnackBarError(false);
  };
  return (
    <div className={styles.shoppingCart}>
      <Snackbar open={isOpenSnackBarError} autoHideDuration={3000} onClose={handleClose}>
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
        {cartArray.length !== 0 ? (
          <div className="row">
          <div className="col-9">
            <h5>{cartArray.length} Khóa học trong giỏ hàng</h5>
            <div className={styles.cartListElement}>
              {cartArray.map(item => (
                <div className="p-2 border" key={item.maKhoaHoc}>
                <div className="row">
                  <div className="col-2" onClick={() => props.history.push(`/course-detail/${item.maKhoaHoc}`)}>
                    <img src={item.hinhAnh} alt="images" width="100%" height={80} style={{cursor: "pointer"}}/>
                  </div>
                  <div className="col-6">
                  <h6 style={{cursor: "pointer"}} onClick={() => props.history.push(`/course-detail/${item.maKhoaHoc}`)}>{item.tenKhoaHoc}</h6>
              <p className="mb-0 text-muted">{item.nguoiTao && item.nguoiTao.hoTen}</p>
              <p className="mb-0 text-muted">{item.danhMucKhoaHoc && item.danhMucKhoaHoc.tenDanhMucKhoaHoc}</p>
                  </div>
                  <div className="col-2"><p className={styles.deleteCart} onClick={() => {dispatch(deleteCart(item.maKhoaHoc)); dispatch(calTotalPrice())}}>Xóa</p></div>
              <div className="col-2">{item.luotXem === 0 ? (<h5>Free<LocalOfferIcon fontSize="small"/></h5>) : (<h5 className="text-danger">${item.luotXem}<LocalOfferIcon fontSize="small" className="ml-1"/></h5>) }</div>
                </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-3">
            <div className={styles.toTalPrice}>
              <h4 className="text-muted">Tổng cộng:</h4>
              <h2>${totalPrice}</h2>
              <Button color="danger" className={styles.btnCheckOut} onClick={() => handleCheckOut()}>
                <PaymentIcon fontSize="small" className="mr-3"/>Thanh toán
              </Button>
            </div>
            
          </div>
        </div>
        ) : (
          <div className={styles.cartEmpty}>
            <h5>0 Khóa học trong giỏ hàng</h5>
            <div className={`${styles.cartEmptyContent} text-center`}>
              <div>
              <p><ShoppingCartIcon className={styles.cartEmptyIcon}/></p>
              <p>Giỏ hàng đang trống. Hãy tìm ngay khóa học dành cho bạn!</p>
              <Button color="danger" className={styles.cartEmptyBtn} onClick={() => props.history.push("/course-list")}>Mua ngay</Button>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};
export default CartList;
