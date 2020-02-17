import React from 'react'
import {userSelector, useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import { getMyCoursesList, getAccountInfo } from '../../actions/userActions'
import { getCourseList } from '../../actions/courseAction'

const MyCourse = () => {
    
    const dispatch = useDispatch()
    const {listCourses} = useSelector(state => state.courseReducer)
    const {myCoursesList} = useSelector(state => state.userReducer)
    

    useEffect(() => {
       
        dispatch(getMyCoursesList())
        dispatch(getCourseList())
    }, [])
    
    
    
    return (
        
        <div>
           {myCoursesList.length !== 0 ? (listCourses.map(item => (
               <div key={item.maKhoaHoc}>
               {myCoursesList.map(myItem => (
                   <div key={myItem.maKhoaHoc}>
                   {item.maKhoaHoc === myItem.maKhoaHoc && <div>
                       <p>{item.maKhoaHoc}</p>
                       <img src={item.hinhAnh} alt="" width="100%" height="300px"/>
                   </div>}
                   </div>
               ))}
               </div>
           ))) : <p>Bạn chưa được ghi danh khóa học</p>}
        </div>
    )
}
export default MyCourse
