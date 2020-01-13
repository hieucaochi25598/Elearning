import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Spinner } from 'reactstrap'
import { getCourseList, findCourse } from '../../actions/courseAction'
import CourseTitle from './CourseTitle'
import useLoading from '../../customHook/useLoading'
import { Formik } from 'formik'
import { Form } from 'reactstrap'
import { MyTextField } from './Signup'
import { FormGroup } from '@material-ui/core'
import { getAccountInfo } from '../../actions/userActions'

const CourseList = (props) => {
    const { listCourses } = useSelector(state => state.courseReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCourseList())
        dispatch(getAccountInfo())
    }, [])

    const { loading } = useLoading()
    
    const handleFind = (e) => {
        dispatch(findCourse(e.target.value))

    }
    return (

        <div className="container">
            <CourseTitle />
            <Formik initialValues={{
                tenKhoaHoc: ''
            }}>
                {({ handleChange }) =>
                    <Form>
                        <FormGroup>
                            <MyTextField name="tenKhoaHoc" type="text" label="Find course" onChange={e => {handleChange(e); handleFind(e)}}/>
                        </FormGroup>
                    </Form>
                }
            </Formik>
            {loading ? <Spinner color="danger" /> : <div className="row">
                {listCourses.map((item, index) => (
                    <div className="col-3" key={index}>
                        <div className="card">
                            <img className="card-img-top" src={item.hinhAnh} alt width={240} height={135} />
                            <div className="card-body">
                                <h6 className="card-title">{item.tenKhoaHoc}</h6>
                                <p className="card-text">{item.biDanh}</p>
                                <p className="card-text">{item.ngayTao}</p>
                            </div>
                            <button className="btn btn-success" onClick={() => props.history.push(`/course-detail/${item.maKhoaHoc}`)}>Detail</button>
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    )
}
export default CourseList
