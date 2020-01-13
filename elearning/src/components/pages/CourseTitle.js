import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseTitle, getCourseFromTitle } from '../../actions/courseAction'

const CourseTitle = () => {
    const dispatch = useDispatch()
    const {courseTitle} = useSelector(state => state.courseReducer)
   
    useEffect(()=>{
        dispatch(getCourseTitle())
    }, [])
    // console.log(courseTitle)
    return (
        <div className="container">
            <div className="row">
                {courseTitle.map((item, index) => (
                    <div className="card col-4" key={index}>
                    <div className="card-body">
                        <h4 className="card-title" onClick={() => dispatch(getCourseFromTitle(item.maDanhMuc))}>{item.tenDanhMuc}</h4>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}
export default CourseTitle
