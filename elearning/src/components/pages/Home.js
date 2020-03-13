import React from 'react'
import CarouselComponent from '../UI/CarouselComponent'
import CourseList from './CourseList'
import CourseTitleHome from '../UI/CourseTitleHome'
import CourseListHome from '../UI/CourseListHome'
import NewCoursesHome from '../UI/NewCoursesHome'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseListAll } from '../../actions/courseAction'
import { useState } from 'react'
import StatesHome from '../UI/StatesHome'
import InstructionsHome from '../UI/InstructionsHome'
import StudentsComments from '../UI/StudentsComments'
import NewEvents from '../UI/NewEvents'



const Home = (props) => {
    const dispatch = useDispatch()
    const {listCourses} = useSelector(state => state.courseReducer)
    const [isFetch, setIsFetch] = useState(false)
    useEffect(() => {
        dispatch(getCourseListAll(() => {setIsFetch(true)}))
    }, [])
    return (
        <div>
            <CarouselComponent/>
            <CourseTitleHome/>
            <CourseListHome propsHome={props} isFetch={isFetch} listCourses={listCourses}/>
            <NewCoursesHome propsHome={props} isFetch={isFetch} listCourses={listCourses}/>
            <StatesHome/>
            <InstructionsHome/>
            <StudentsComments/>
            <NewEvents/>
        </div>
    )
}
export default Home
