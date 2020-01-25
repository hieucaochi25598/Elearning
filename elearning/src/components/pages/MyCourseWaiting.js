import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyCoursesListWaiting } from '../../actions/userActions'
import { getCourseList } from '../../actions/courseAction'
const MyCourseWaiting = () => {
    const dispatch = useDispatch()
    const {myCousesListWaiting} = useSelector(state => state.userReducer)
    const {listCourses} = useSelector(state => state.courseReducer)
    useEffect(() => {
        dispatch(getMyCoursesListWaiting())
        dispatch(getCourseList())
    }, [])
    // console.log(myCousesListWaiting)
    // console.log(listCourses)
    return (
        <div>
            {listCourses.map(item => (
                <div key={item.maKhoaHoc}>
                    {myCousesListWaiting.map(myItem => (
                        <div>
                            {myItem.maKhoaHoc === item.maKhoaHoc &&
                            <div key={myItem.maKhoaHoc}>
                                <img src={item.hinhAnh} alt=""/>
                                <p>{item.tenKhoaHoc}</p>
                            </div>
                            }
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}
export default MyCourseWaiting
