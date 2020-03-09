import React from "react";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
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
import { Link } from "react-router-dom";

import { useState } from "react";
import styles from "../../styles/Layout/header.module.scss";
import { useSelector, useDispatch } from "react-redux";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import ComputerIcon from "@material-ui/icons/Computer";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Swal from "sweetalert2";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import HomeIcon from "@material-ui/icons/Home";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { deleteCart, calTotalPrice, getWishList } from "../../actions/userActions";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const { userInfo, cartArray, totalPrice, wishListArray} = useSelector(
    state => state.userReducer
  );
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };

    
  
  return (
    <div>
      <Navbar className={styles.myNavbar} light expand="md">
        <UncontrolledPopover
          trigger="legacy"
          placement="bottom"
          target="PopoverCart"
        >
          {/* <PopoverHeader className={styles.cartInfo}>
          <AddShoppingCartIcon className="mr-1" /> Thông tin giỏ hàng
        </PopoverHeader> */}
          {cartArray.length !== 0 ? (
            <PopoverBody className="p-0" style={{ overflow: "hidden" }}>
              {cartArray.map((item, index) => (
                
                <div
                  className={`row mb-2 align-items-center pr-4 pl-4 pt-2 pb-2 ${styles.cartItem}`}
                  key={index}
                  style={{ cursor: "pointer" }}
                  
                >
                  <div className="col-3 pr-0">
                    <div>
                      <img
                        src={item.hinhAnh}
                        alt="images"
                        width="100%"
                        height={53}
                      />
                    </div>
                  </div>
                  <div className="col-9">
                    <div>
                      <h6 className="mb-0">{item.tenKhoaHoc}</h6>
                      <p className="mb-0">
                        {item.nguoiTao && item.nguoiTao.hoTen}
                      </p>
                      {item.luotXem === 0 ? (<h5 className="mb-0 text-danger">Free</h5>) : (<h5 className="mb-0 text-danger">${item.luotXem}</h5>) }
                    </div>
                  </div>
                  {/* <div className="col-3 pl-0">
                  <Button
                    color="danger"
                    onClick={() => {dispatch(deleteCart(item.maKhoaHoc)); dispatch(calTotalPrice())}}
                  >
                    <DeleteForeverIcon fontSize="large" />
                  </Button>
                </div> */}
                </div>
            
              ))}
              <div className={styles.totalPriceCart}>
                <span className="mb-0">Tổng tiền: </span>
                <strong>${totalPrice}</strong>
                <Button
                  color="danger"
                  className={styles.cartButton}
                  tag={Link}
                  to="/cart-list"
                >
                  Đến giỏ hàng
                </Button>
              </div>
            </PopoverBody>
          ) : (
            <PopoverBody>
              <h5 className="text-center">
                Bạn chưa thêm khóa học vào giỏ hàng
              </h5>
            </PopoverBody>
          )}
        </UncontrolledPopover>
        <NavbarBrand href="/" className="ml-3">
          {/* <img src="./img/logo.png" alt="image" width={70} height={70} /> */}
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
            <NavItem id="PopoverWishList">
              <NavLink className={styles.myWishList}>
                <FavoriteBorderIcon fontSize="small"/>
          {wishListArray.length !== 0 && <div className={styles.wishNotice}>{wishListArray.length}</div>}
          <UncontrolledPopover
          trigger="legacy"
          placement="bottom"
          target="PopoverWishList"
        >
          {/* <PopoverHeader className={styles.cartInfo}>
          <AddShoppingCartIcon className="mr-1" /> Thông tin giỏ hàng
        </PopoverHeader> */}
          {wishListArray.length !== 0 ? (
            <PopoverBody className="p-0" style={{ overflow: "hidden" }}>
              {wishListArray.map((item, index) => (
                
                <div
                  className={`row mb-2 align-items-center pr-4 pl-4 pt-2 pb-2 ${styles.cartItem}`}
                  key={index}
                  style={{ cursor: "pointer" }}
                  
                >
                  <div className="col-3 pr-0">
                    <div>
                      <img
                        src={item.hinhAnh}
                        alt="images"
                        width="100%"
                        height={53}
                      />
                    </div>
                  </div>
                  <div className="col-9">
                    <div>
                      <h6 className="mb-0">{item.tenKhoaHoc}</h6>
                      <p className="mb-0">
                        {item.nguoiTao && item.nguoiTao.hoTen}
                      </p>
                    </div>
                  </div>
                  {/* <div className="col-3 pl-0">
                  <Button
                    color="danger"
                    onClick={() => {dispatch(deleteCart(item.maKhoaHoc)); dispatch(calTotalPrice())}}
                  >
                    <DeleteForeverIcon fontSize="large" />
                  </Button>
                </div> */}
                </div>
            
              ))}
              <div className={styles.totalPriceCart}>
                <Button
                  color="danger"
                  className={styles.cartButton}
                  tag={Link}
                  to="/wish-list"
                >
                  Khóa học yêu thích
                </Button>
              </div>
            </PopoverBody>
          ) : (
            <PopoverBody>
              <h5 className="text-center">
                Hãy thêm các khóa học vào danh sách yêu thích
              </h5>
            </PopoverBody>
          )}
        </UncontrolledPopover>
              </NavLink>
            </NavItem>
            <NavItem className={styles.myNavItem} id="PopoverCart">
              <NavLink className={styles.myCart}>

                <ShoppingCartOutlinedIcon fontSize="small" />
          {cartArray.length !== 0 && <div className={styles.cartNotice}>{cartArray.length}</div>}
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
                    to={"/account-info/" + userInfo.taiKhoan}
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
                    <Button color="primary" className={styles.myBtnSignUp}>
                      Sign Up
                    </Button>
                  </Link>
                </NavItem>
              </div>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
export default Header;
