import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { deleteWishList, addToCart } from "../../actions/userActions";
import styles from "../../styles/Layout/wishlist.module.scss";
import StarIcon from "@material-ui/icons/Star";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from "@material-ui/icons/Favorite";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useState } from "react";
const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
const WishList = (props) => {
  
  const { isSuccessAdd, wishListArray } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
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
  return (
    <div className={styles.wishListContainer}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        {isSuccessAdd ? (
          <Alert onClose={handleClose} severity="success">
            Thêm giỏ hàng thành công !
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error">
            Khóa học đã có trong giỏ hàng !
          </Alert>
        )}
      </Snackbar>
      <div className={styles.wishListTitleContainer}>
        <div className={styles.wishListTitle}>
          <h2 className="mb-0">
            <FavoriteIcon fontSize="small" className="mr-2" />
            Khóa Học Yêu Thích
          </h2>
        </div>
      </div>
      <div className={styles.wishList}>
        <div className="row">
          {wishListArray.map(item => (
            <div className="col-3" key={item.maKhoaHoc}>
              <div className={`card ${styles.cardWishList} mb-4`}>
                <div className={styles.divImage}>
                <img
                  className="card-img-top"
                  src={item.hinhAnh}
                  alt="images"
                  width="100%"
                  height={130}
                />
                <div className={styles.iconHeart}>
                  <FavoriteIcon fontSize="small"/>
                </div>
                <div className={styles.iconDelete}>
                  <DeleteIcon fontSize="small" onClick={() => dispatch(deleteWishList(item.maKhoaHoc))}/>
                </div>
                <div className={styles.iconAddToCart}>
                  <ShoppingCartIcon fontSize="small" onClick={() => dispatch(addToCart(item, handleOpenSnack))}/>
                </div>
                </div>
                <div className="card-body">
                  <h6 className="card-title">{item.tenKhoaHoc}</h6>
                  <p className={`card-text mb-0 ${styles.inStrucTor}`}>
                    {item.nguoiTao && item.nguoiTao.hoTen}
                  </p>
                  <div>
                    <StarIcon className={styles.courseStar} />
                    <StarIcon className={styles.courseStar} />
                    <StarIcon className={styles.courseStar} />
                    <StarIcon className={styles.courseStar} />
                    <StarIcon className={styles.courseStar} />
                    <span className={`ml-2 ${styles.ratingStart}`}>5.0</span>
                  </div>
                  {/* <Button
                    color="primary"
                    onClick={() => dispatch(deleteWishList(item.maKhoaHoc))}
                  >
                    Xoa
                  </Button> */}
          <h4 className="mb-0 text-right">${item.luotXem}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default WishList;
