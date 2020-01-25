import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccountInfo, onToggleModal } from "../../actions/userActions";
import FormEditAccount from "./FormEditAccount";
import { Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/Layout/userdetail.module.scss";
import TimerIcon from '@material-ui/icons/Timer';
import CodeIcon from '@material-ui/icons/Code';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import MenuBookIcon from '@material-ui/icons/MenuBook';
const UserDetail = () => {
  const dispatch = useDispatch();
  const { accountInfo } = useSelector(state => state.userReducer);
  useEffect(() => {
    dispatch(getAccountInfo());
  }, []);
  return (
    <div className={styles.userDetailDashboard}>
      <FormEditAccount />
      <div className={`card text-center ${styles.myCardUser}`}>
        <img
          className={`card-img-top ${styles.imageUserInfo}`}
          src="/img/userImage.png"
          alt
          width="35%"
          height={160}
        />
        <div className={`card-body ${styles.cardBody}`}>
          <h4 className={`card-title ${styles.userInfoTitle}`}><InfoIcon className="mr-1" fontSize="large"/> Thông tin tài khoản</h4>
          <p className="card-title mb-2">Tài khoản: {accountInfo.taiKhoan}</p>
          <p className="card-text mb-2">Họ tên: {accountInfo.hoTen}</p>
          <p className="card-text mb-2">Email: {accountInfo.email}</p>
          <p className="card-text mb-2">Số điện thoại: {accountInfo.soDT}</p>
          <p className="card-text mb-2">
            Mã loại người dùng: {accountInfo.maLoaiNguoiDung}
          </p>
          <Button
            variant="contained" color="primary"
            onClick={() => {
              dispatch(onToggleModal(true));
            }}
          >
            <EditIcon className="mr-1"/> Chỉnh sửa thông tin
          </Button>
          <div>
            <h4 className={`${styles.userInfoTitle} mt-4`}><MenuBookIcon className="mr-1" fontSize="large"/> Quản lý khóa học</h4>
            <Nav vertical>
              <NavItem>
                <NavLink tag={Link} to={
                      "/account-info/" +
                      accountInfo.taiKhoan +
                      "/signup-courses"
                    }
                    className={styles.myNavLink}
                    >
                
                    <PlaylistAddCheckIcon className="mr-1"/> Danh sách khóa học đã đăng ký
                  
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={styles.myNavLink} tag={Link} to={"/account-info/" + accountInfo.taiKhoan + "/my-courses"}>
                  
                   <CodeIcon className="mr-1"/> Khóa học của tôi
                  
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={styles.myNavLink} tag={Link} to={
                      "/account-info/" +
                      accountInfo.taiKhoan +
                      "/my-courses-waiting"
                    }>
                    <TimerIcon className="mr-1"/>Khóa học đang chờ xét duyệt
                </NavLink>
              </NavItem>
              
            </Nav>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserDetail;
