import React from 'react'
import { Formik } from 'formik'
import { InputAdornment } from '@material-ui/core'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import { Form, FormGroup, Button, Spinner } from 'reactstrap'
import { MyTextField } from './Signup'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logInAction } from '../../actions/userActions'
import styles from '../../styles/Layout/login.module.scss'
import { useEffect } from 'react'
import useLoading from '../../customHook/useLoading'
const Login = (props) => {

    const validationSchema = yup.object({
        taiKhoan: yup.string().required('Field is required'),
        matKhau: yup.string().required('Field is required')
    })
    const [showPassWord, setShowPassWord] = useState()

    const { userInfo } = useSelector(state => state.userReducer)
    //Check nguoi dung neu biet truoc link /login se quay ve trang chu
    useEffect(() => {
        if (Object.keys(userInfo).length !== 0) {
            props.history.push('/home')
        }

    }, [userInfo])

    const dispatch = useDispatch()
    const handleSuccess = () => {
        props.history.replace("/home")
    }
    const { loading } = useLoading()

    return (
        <div>
            {loading ? <div className={styles.divSpinner}>
                <div className={styles.divCoverSpinner}>
                    <Spinner type="grow" color="primary" />
                    <Spinner type="grow" color="secondary" />
                    <Spinner type="grow" color="success" />
                    <Spinner type="grow" color="danger" />
                    <Spinner type="grow" color="warning" />
                    <Spinner type="grow" color="info" />
                    <Spinner type="grow" color="dark" />
                </div>
            </div> : <div className={styles.myLoginForm}>
                    <Formik
                        initialValues={{
                            taiKhoan: '',
                            matKhau: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={values => dispatch(logInAction(values, handleSuccess))}>
                        {({ handleSubmit }) =>
                            <Form className={styles.myMainLoginForm}>
                                <h2>Login Now</h2>
                                <i className={`fa fa-user ${styles.iconLogin}`}></i>
                                <FormGroup>
                                    <MyTextField
                                        className={styles.myTextField}
                                        type="text"
                                        name="taiKhoan"
                                        label="Username"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">
                                                <i className="fa fa-user"></i>
                                            </InputAdornment>
                                        }}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <MyTextField
                                        className={styles.myTextField}
                                        type={showPassWord ? "text" : "password"}
                                        name="matKhau"
                                        label="Password"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">
                                                <i class="fa fa-lock"></i>
                                            </InputAdornment>,
                                            endAdornment: <InputAdornment position="end">
                                                <i className="fa fa-eye" onClick={() => setShowPassWord(!showPassWord)} style={{ cursor: "pointer", color: "black" }}></i>
                                            </InputAdornment>
                                        }}
                                    />
                                </FormGroup>
                                <Link to="/signup" className="d-block mb-3">Don't have an account? Sign up now</Link>
                                <Button className={styles.myBtnLogin} onClick={handleSubmit}>Login</Button>
                            </Form>
                        }
                    </Formik>
                </div>}
        </div>
    )
}
export default Login
