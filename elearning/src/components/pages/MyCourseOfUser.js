import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { layDanhSachKhoaHocDaXetDuyet } from '../../actions/userActions'

const MyCourseOfUser = (props) => {
    const {userInfo, danhSachKHDaXetDuyet} = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(layDanhSachKhoaHocDaXetDuyet())
    }, [userInfo])
    return (
        <div className="container mt-5">
            
                {danhSachKHDaXetDuyet.length !== 0 ? (danhSachKHDaXetDuyet.map(item => (
                    <div key={item.maKhoaHoc} className="mt-3">
                        <div className="row">
                            <div className="col-3">
                                <img src={item.hinhAnh} alt="images" width="100%" height={150}/>
                            </div>
                            <div className="col-8">
                                <h4>{item.tenKhoaHoc}</h4>
                                <button className="btn btn-primary" onClick={() => props.history.push(`/course-detail/${item.maKhoaHoc}`)}>Bắt đầu học</button>
                            </div>

                        </div>
                        
                    </div>
                ))) : (<div> 
                    Bạn chưa được xét duyệt khóa học 
                </div>)}
            
        </div>
    )
}
export default MyCourseOfUser
