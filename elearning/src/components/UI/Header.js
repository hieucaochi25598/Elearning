import React from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useState } from "react";
import styles from "../../styles/Layout/header.module.scss";
import { useSelector, useDispatch } from "react-redux";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import ComputerIcon from "@material-ui/icons/Computer";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Swal from "sweetalert2";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";
import HomeIcon from "@material-ui/icons/Home";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { deleteCart, calTotalPrice } from "../../actions/userActions";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const { userInfo, cartArray, totalPrice } = useSelector(
    state => state.userReducer
  );
  const handleLogout = () => {
    
    localStorage.removeItem("userInfo");
    window.location.reload();
  };
  
  return (
    <div>
      <Navbar className={styles.myNavbar} light expand="md">
        <NavbarBrand href="/">
          <img src="./img/logo.png" alt="" width={70} height={70} />
          <span>
            <span className={styles.myTextLogo}>E</span>-Learning
          </span>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className={styles.myNavItem}>
              <NavLink className={styles.myNavLink} tag={Link} to="/home">
                <HomeIcon fontSize="large" /> TRANG CHỦ
              </NavLink>
            </NavItem>
            <NavItem className={styles.myNavItem}>
              <NavLink
                className={styles.myNavLink}
                tag={Link}
                to="/course-list"
              >
                <ListAltIcon fontSize="large" /> DANH SÁCH KHÓA HỌC
              </NavLink>
            </NavItem>
            <NavItem className={styles.myNavItem}>
              <NavLink className={styles.myCart}>
                <ShoppingCartIcon fontSize="large" id="PopoverCart" />
              </NavLink>
            </NavItem>
            {Object.keys(userInfo).length !== 0 ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <AccountCircleIcon fontSize="large" color="secondary" />{" "}
                  Hello, {userInfo.taiKhoan}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    tag={Link}
                    to={"/account-info/" + userInfo.taiKhoan + "/my-courses"}
                    className={styles.myDropDown}
                  >
                    <AccountBoxIcon /> Thông tin tài khoản
                  </DropdownItem>
                  {userInfo.maLoaiNguoiDung === "GV" && (
                    <DropdownItem
                      tag={Link}
                      to="/admin"
                      className={styles.myDropDown}
                    >
                      <ComputerIcon /> Quản trị hệ thống
                    </DropdownItem>
                  )}
                  <DropdownItem divider />
                  <DropdownItem
                    onClick={() =>
                      Swal.fire({
                        title: "Bạn có chắc chắn muốn đăng xuất?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Có",
                        cancelButtonText: "Không"
                      }).then(result => {
                        if (result.value) {
                          handleLogout();
                        }
                      })
                    }
                    tag={Link}
                    to="/home"
                    className={styles.myDropDown}
                  >
                    <ExitToAppIcon /> Đăng xuất
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <div className="d-flex">
                <NavItem className={styles.myNavItem}>
                  <Link to="/login">
                    <Button color="secondary" className={styles.myBtnLogin}>
                      Log In
                    </Button>
                  </Link>
                </NavItem>
                <NavItem className={styles.myNavItem}>
                  <Link to="/signup">
                    <Button color="danger" className={styles.myBtnSignUp}>
                      Sign Up
                    </Button>
                  </Link>
                </NavItem>
              </div>
            )}
          </Nav>
        </Collapse>
      </Navbar>
      
      <UncontrolledPopover
        trigger="legacy"
        placement="bottom"
        target="PopoverCart"
        
      >
        <PopoverHeader className={styles.cartInfo}>
          <AddShoppingCartIcon className="mr-1" /> Thông tin giỏ hàng
        </PopoverHeader>
        {cartArray.length !== 0 ? (
          <PopoverBody>
            {cartArray.map((item, index) => (
              <div className="row mb-2 align-items-center" key={index}>
                <div className="col-4 pr-0">
                  <div>
                    <img
                      src={item.hinhAnh}
                      alt="image"
                      width="100%"
                      height={65}
                    />
                  </div>
                </div>
                <div className="col-5">
                  <div>
                    <h6>{item.tenKhoaHoc}</h6>

                    <p className="mb-0">Giá: ${item.giaTien}</p>
                  </div>
                </div>
                <div className="col-3 pl-0">
                  <Button
                    color="danger"
                    onClick={() => {dispatch(deleteCart(item.maKhoaHoc)); dispatch(calTotalPrice())}}
                  >
                    <DeleteForeverIcon fontSize="large" />
                  </Button>
                </div>
              </div>
            ))}
            <h5 className="mb-0">Tổng tiền: ${totalPrice}</h5>
            <Button color="danger" className={styles.cartButton}>
              <CreditCardIcon className="mr-1" /> Thanh toán
            </Button>
          </PopoverBody>
        ) : (
          <PopoverBody>
            <h5 className="text-center">Bạn chưa thêm khóa học vào giỏ hàng</h5>
          </PopoverBody>
        )}
      </UncontrolledPopover>
      </div>
   
  );
};
export default Header;
