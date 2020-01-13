import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { onToggleModal, editAccountInfo } from '../../actions/userActions';
import { Formik, Form } from 'formik';
import { MyTextField } from './Signup';
import { addUser } from '../../actions/usersAction';
const FormAddUser = () => {
    const { isOpen } = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    return (
        <div>
            <Modal isOpen={isOpen} toggle={() => dispatch(onToggleModal(false))} >
                <ModalHeader>Add account</ModalHeader>
                <ModalBody>
                    <Formik initialValues={{
                        taiKhoan: '',
                        matKhau: '',
                        hoTen: '',
                        soDT: '',
                        maLoaiNguoiDung: '',
                        email: ''
                    }}
                        onSubmit={values => dispatch(addUser(values))}
                    >
                        {({ handleSubmit }) =>
                            <Form>
                                <FormGroup>
                                    <MyTextField type="text" name="taiKhoan" label="Username" />
                                </FormGroup>
                                <FormGroup>
                                    <MyTextField type="password" name="matKhau" label="Password" />
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
                                <Button color="secondary" onClick={() => dispatch(onToggleModal(false))}>Cancel</Button>
                            </Form>
                        }
                    </Formik>
                </ModalBody>
                <ModalFooter>
                    
                    
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default FormAddUser
