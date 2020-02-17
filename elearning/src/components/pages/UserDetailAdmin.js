import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail } from "../../actions/usersAction";
import { onToggleModal } from "../../actions/userActions";
import FormEditUsers from "./FormEditUsers";

const UserDetailAdmin = (props) => {
  const dispatch = useDispatch();
  const { userDetail } = useSelector(state => state.usersReducer);
  const { taiKhoan} = props.match.params
  useEffect(() => {
    dispatch(getUserDetail(taiKhoan));
  }, []);

  return (
    <div>
      <FormEditUsers />
      <div className="card">
        <img className="card-img-top" src="holder.js/100x180/" alt />
        <div className="card-body">
          <h2>Thong tin tai khoan</h2>
          <p className="card-title">Tai khoan: {userDetail.taiKhoan}</p>
          <p className="card-text">Mat khau: {userDetail.matKhau}</p>
          <p className="card-text">Ho ten: {userDetail.hoTen}</p>
          <p className="card-text">So DT: {userDetail.soDT}</p>
          <p className="card-text">Email: {userDetail.email}</p>
          <p className="card-text">
            Ma loai nguoi dung: {userDetail.maLoaiNguoiDung}
          </p>
          <button
            className="btn btn-success"
            onClick={() => dispatch(onToggleModal(true))}
          >
            Sua thong tin
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserDetailAdmin;
