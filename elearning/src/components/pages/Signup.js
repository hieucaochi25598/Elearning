import React from 'react'
import { Form, FormGroup, Button, Spinner } from 'reactstrap'
import { Formik, useField } from 'formik'
import { TextField, withStyles, InputAdornment } from '@material-ui/core'
import styles from '../../styles/Layout/signup.module.scss'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signUpAction } from '../../actions/userActions'
import { useState } from 'react'

import useLoading from '../../customHook/useLoading'

const CssTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#ff8c00',
            },
            '&:hover fieldset': {
                borderColor: 'orange',

            },
            '&.Mui-focused fieldset': {
                borderColor: '#ff4500',
            },
        }
    }
})(TextField)
const validationSchema = yup.object({
    taiKhoan: yup.string()
        .required('Field is required')
        .max(50, 'Max 50 characters')
        .min(5, 'Min 5 characters'),
    matKhau: yup.string()
        .required('Field is required')
        .max(30, 'Max 30 characters')
        .min(5, 'Min 5 characters'),
    xacNhanMatKhau: yup.string()
        .oneOf([yup.ref('matKhau')], 'Both password need to be the same')
        .required('Field is required'),
    hoTen: yup.string()
        .required('Field is required'),
    soDT: yup.string()
        .required('Field is required')
        .matches(/(09|01[2|6|8|9])+([0-9]{8})\b/g, 'Invalid number'),
    email: yup.string()
        .required('Field is required')
        .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm
            , 'Invalid email')
})

export const MyTextField = ({ ...props }) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : ''
    return (<CssTextField {...field} {...props}
        helperText={errorText}
        error={errorText}
        variant="outlined"
    />)
}

const Signup = (props) => {
    const dispatch = useDispatch()
    const handleSuccess = () => {
        props.history.push('/login')
    }
    const [showPassWord, setShowPassWord] = useState(false)
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
            </div> :
                <div className={styles.coverForm}>
                    <div className={styles.mySignUpForm}>
                        <Formik initialValues={{
                            taiKhoan: '',
                            matKhau: '',
                            xacNhanMatKhau: '',
                            hoTen: '',
                            soDT: '',
                            email: ''
                        }}
                            validationSchema={validationSchema}
                            onSubmit={values => dispatch(signUpAction(values, handleSuccess))}
                        >
                            {({ handleSubmit }) =>
                                <Form className={styles.mySignUpMainForm}>
                                    <h2>Sign Up Now</h2>
                                    <div className="row">
                                        <FormGroup className="col-6">
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
                                        <FormGroup className="col-6">
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
                                                        <i className="fa fa-eye"
                                                            onClick={() => setShowPassWord(!showPassWord)}
                                                            style={{ cursor: "pointer", color: "black" }}>
                                                        </i>
                                                    </InputAdornment>
                                                }}
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-6">
                                            <MyTextField
                                                className={styles.myTextField}
                                                type={showPassWord ? "text" : "password"}
                                                name="xacNhanMatKhau"
                                                label="Confirm password"
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
                                        <FormGroup className="col-6">
                                            <MyTextField
                                                className={styles.myTextField}
                                                type="text"
                                                name="hoTen"
                                                label="Fullname"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">
                                                        <i className="fa fa-info"></i>
                                                    </InputAdornment>
                                                }}
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-6">
                                            <MyTextField
                                                className={styles.myTextField}
                                                type="text"
                                                name="soDT"
                                                label="Phone number"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">
                                                        <i className="fa fa-phone"></i>
                                                    </InputAdornment>
                                                }}
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-6">
                                            <MyTextField
                                                className={styles.myTextField}
                                                type="text"
                                                name="email"
                                                label="Email"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">
                                                        <i className="fa fa-envelope"></i>
                                                    </InputAdornment>
                                                }}
                                            />
                                        </FormGroup>
                                    </div>
                                    <Link to="/login" className="d-block mb-3">Already have an account? Login now</Link>
                                    <Button onClick={handleSubmit} className={styles.myBtn}>Sign up</Button>
                                </Form>
                            }
                        </Formik>
                    </div>
                </div>

            }

        </div>
    )
}
export default Signup

