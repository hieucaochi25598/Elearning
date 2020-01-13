import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteSignUpCourse } from '../../actions/userActions'
import { getCourseDetail } from '../../actions/courseAction'

const SignUpCourses = (props) => {
    const { accountInfo } = useSelector(state => state.userReducer)
    return (
        <div>
                {accountInfo.chiTietKhoaHocGhiDanh && Object.keys(accountInfo.chiTietKhoaHocGhiDanh).length !== 0 ? (accountInfo.chiTietKhoaHocGhiDanh.map(item => (
                    <div className="card" key={item.maKhoaHoc}>
                        <img className="card-img-top" src="holder.js/100x180/" alt />
                        <div className="card-body">
                            <h4 className="card-title">{item.maKhoaHoc}</h4>
                            <p className="card-text">{item.tenKhoaHoc}</p>
                            <button className="btn btn-success" onClick={() => props.history.push(`/course-detail/${item.maKhoaHoc}`)}>Chi tiet</button>
                            
                        </div>
                    </div>
                ))) : <p>Ban chua dang ky khoa hoc</p>}
        </div>
    )
}
export default SignUpCourses
