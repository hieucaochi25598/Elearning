import {useState, useEffect} from "react"
import {useSelector, useDispatch} from 'react-redux'

import { getCourseList, changePageAction } from "../actions/courseAction"
const useFetchCoursesList = () => {
    const dispatch = useDispatch()
    const {listCourses, currentPage, totalCount} = useSelector(state => state.courseReducer)
    const onChangePage = (page) => {
        dispatch(changePageAction(page))
    }
    const [isFetch, setIsFetch] = useState(false)
    const handleSuccess = () => {
        setIsFetch(true)
    }
    useEffect(() => {
        dispatch(getCourseList(currentPage, 10,handleSuccess))
    }, [currentPage])

    return { listCourses, currentPage, totalCount, onChangePage, isFetch , handleSuccess}
}
export default useFetchCoursesList