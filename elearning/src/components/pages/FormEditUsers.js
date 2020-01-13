import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { onToggleModal } from '../../actions/userActions';
import { Formik, Form } from 'formik';
import { MyTextField } from './Signup';
import { editUserDetail } from '../../actions/usersAction';
const FormEditUsers = () => {
    const { isOpen } = useSelector(state => state.userReducer)
    const { userDetail } = useSelector(state => state.usersReducer)
    const dispatch = useDispatch()
    return (
        <div>

            <Modal isOpen={isOpen} toggle={() => dispatch(onToggleModal(false))} >
                <ModalHeader>Edit user's info</ModalHeader>
                <ModalBody>
                    <Formik initialValues={{
                        taiKhoan: userDetail.taiKhoan,
                        matKhau: userDetail.matKhau,
                        hoTen: userDetail.hoTen,
                        soDT: userDetail.soDT,
                        maLoaiNguoiDung: userDetail.maLoaiNguoiDung,
                        email: userDetail.email
                    }}
                        onSubmit={values => dispatch(editUserDetail(values))}
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
                                <Button color="primary" onClick={() => { handleSubmit(); dispatch(onToggleModal(false)) }}>Do Something</Button>
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
export default FormEditUsers
