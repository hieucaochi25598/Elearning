import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAccountInfo, onToggleModal } from '../../actions/userActions'
import FormEditAccount from './FormEditAccount'
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom'

const UserDetail = () => {
    const dispatch = useDispatch()
    const { accountInfo } = useSelector(state => state.userReducer)
    useEffect(()=> {
      dispatch(getAccountInfo())
    }, [])
    return (
        <div className="container">
            <FormEditAccount/>
            <div className="card">
                <img className="card-img-top" src="holder.js/100x180/" alt />
                <div className="card-body">
                    <h4 className="card-title">Thong tin tai khoan</h4>
                    <p className="card-title">Tai khoan: {accountInfo.taiKhoan}</p>
                    <p className="card-text">Ho ten: {accountInfo.hoTen}</p>
                    <p className="card-text">So dien thoai: {accountInfo.soDT}</p>
                    <p className="card-text">Ma loai nguoi dung: {accountInfo.maLoaiNguoiDung}</p>
                    <button className="btn btn-primary" onClick={() => {dispatch(onToggleModal(true))}}>Edit</button>
                    <div>
      <p>List Based</p>
      <Nav vertical>
        <NavItem>
          <NavLink><Link to={"/account-info/" + accountInfo.taiKhoan +"/signup-courses"}>Danh sach khoa hoc da dang ky</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Another Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink disabled href="#">Disabled Link</NavLink>
        </NavItem>
      </Nav>
    </div>
                </div>
            </div> 
        </div>
    )
}
export default UserDetail
