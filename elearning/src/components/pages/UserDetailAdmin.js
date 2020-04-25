import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail } from "../../actions/usersAction";
import {Link} from 'react-router-dom'
import { onToggleModal } from "../../actions/userActions";
import FormEditUsers from "./FormEditUsers";
import { Nav, NavItem, NavLink } from 'reactstrap';
import { useState } from "react";
const UserDetailAdmin = () => {
  const dispatch = useDispatch();
  const { userDetail, userChosing } = useSelector(state => state.usersReducer);
 
  useEffect(() => {
    dispatch(getUserDetail(userChosing.taiKhoan));
  }, []);

  const [activeTab, setActiveTab] = useState(0);

  const toggle = tab => {
    if(activeTab !== tab) 
    setActiveTab(tab);
  }
  return (
    <div className="mb-3">
      <FormEditUsers />
      <div className="p-3">
        <div className="row p-3 border">
          <div className="col-2">
            <img src="https://imagesofrmnp.com/images/xl/Hidden-Summit.jpg" alt="images" width="100%" height={180} className="rounded-circle"/>
          </div>
          <div className="col-5 border-right d-flex align-items-center">
            <div>
            <h2>{userDetail.hoTen}</h2>
            <p>Mã Loại Người Dùng: {userDetail.maLoaiNguoiDung}</p>
            <button
                        className="btn btn-success"
                        onClick={() => dispatch(onToggleModal(true))}
                      >
                        <i className="fa fa-edit"></i>Chỉnh sửa thông tin
                      </button>
            </div>
           
          </div>
          <div className="col-5 d-flex align-items-center">
            <div>
          <h6>Tài khoản: <span className="text-secondary font-weight-normal">{userDetail.taiKhoan}</span></h6>
          <h6>Mật khẩu: <span className="text-secondary font-weight-normal">{userDetail.matKhau}</span></h6>
          <h6>Email: <span className="text-secondary font-weight-normal">{userDetail.email}</span></h6>
          <h6>Số điện thoại: <span className="text-secondary font-weight-normal">{userDetail.soDT}</span></h6>
          </div>

          </div>
        </div>
      </div>
          
       
    
      <Nav tabs className="justify-content-between">
        <NavItem>
          <NavLink
            tag={Link}
            className={`${activeTab === 0 ? ("active") : ("")}`}
            to={`/admin/user-detail/list-course-enrolled/${userChosing.taiKhoan}`}
            onClick={() => { toggle(0); }}
          >
            DANH SÁCH KHÓA HỌC ĐÃ GHI DANH
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
          tag={Link}
            className={`${activeTab === 1 && "active"}`}
            to={`/admin/user-detail/list-course-not-enroll/${userChosing.taiKhoan}`}
            onClick={() => { toggle(1); }}
          >
            DANH SÁCH KHÓA HỌC CHƯA GHI DANH
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
          tag={Link}
            className={`${activeTab === 2 && "active"}`}
            to={`/admin/user-detail/list-course-wait-enrolled/${userChosing.taiKhoan}`}
            onClick={() => { toggle(2); }}
          >
            DANH SÁCH KHÓA HỌC CHỜ XÉT DUYỆT
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};
export default UserDetailAdmin;
