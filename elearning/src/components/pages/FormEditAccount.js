import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { onToggleModal, editAccountInfo } from '../../actions/userActions';
import { Formik, Form } from 'formik';
import { MyTextField } from './Signup';


const FormEditAccount = () => {
    const { isOpen, accountInfo } = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    // useEffect(() => {
    //     const {taiKhoan , matKhau, hoTen, soDT, maLoaiNguoiDung, email} = accountInfoChosing

    // }, [accountInfoChosing])
   
    return (
        <div>
            <Modal isOpen={isOpen} toggle={() => dispatch(onToggleModal(false))} >
                <ModalHeader>Edit account info</ModalHeader>
                <ModalBody>
                    <Formik initialValues={{
                        taiKhoan: accountInfo.taiKhoan,
                        matKhau: accountInfo.matKhau,
                        hoTen: accountInfo.hoTen,
                        soDT: accountInfo.soDT,
                        maLoaiNguoiDung: accountInfo.maLoaiNguoiDung,
                        email: accountInfo.email
                    }}
                        onSubmit={values => dispatch(editAccountInfo(values))}
                    >
                        {({ handleSubmit }) =>
                            <Form>
                                <FormGroup>
                                    <MyTextField type="text" name="taiKhoan" disabled="true" label="Username" />
                                </FormGroup>
                                <FormGroup>
                                    <MyTextField type="text" name="matKhau" label="Password" />
                                </FormGroup>
                                <FormGroup>
                                    <MyTextField type="text" name="hoTen" label="Fullname" />
                                </FormGroup>
                                <FormGroup>
                                    <MyTextField type="text" name="soDT" label="Phone number" />
                                </FormGroup>
                                <FormGroup>
                                    <MyTextField type="text" name="maLoaiNguoiDung" label="User type code" />
                                </FormGroup>
                                <FormGroup>
                                    <MyTextField type="text" name="email" label="Email" />
                                </FormGroup>
                                <Button color="primary" onClick={() => {handleSubmit(); dispatch(onToggleModal(false))}}>Do Something</Button>
                            </Form>
                        }
                    </Formik>
                </ModalBody>
                <ModalFooter>
                    
                    <Button color="secondary" onClick={() => dispatch(onToggleModal(false))}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default FormEditAccount
