import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { onToggleModal } from "../../actions/userActions";
import { Formik, Form } from "formik";
import { MyTextField } from "./Signup";
import { editUserDetail } from "../../actions/usersAction";
import { MyInput } from "./FormEditAccount";
import {
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Label
} from "reactstrap";
import {validationSchema} from './FormAddUser'
const FormEditUsers = () => {
  const { isOpen } = useSelector(state => state.userReducer);
  const { userDetail } = useSelector(state => state.usersReducer);
  const dispatch = useDispatch();
  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => dispatch(onToggleModal(false))}>
        <ModalHeader>
          <i className="fa fa-edit mr-2"></i>Chỉnh sửa thông tin người dùng
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              taiKhoan: userDetail.taiKhoan,
              matKhau: userDetail.matKhau,
              hoTen: userDetail.hoTen,
              soDT: userDetail.soDT,
              maLoaiNguoiDung: userDetail.maLoaiNguoiDung,
              email: userDetail.email
            }}
            onSubmit={values => {dispatch(editUserDetail(values)); dispatch(onToggleModal(false))}}
          validationSchema={validationSchema}>
            {({ handleSubmit }) => (
              <Form>
                <FormGroup className="mb-0">
                  <Label>Tài khoản</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-warning text-light">
                        <i className="fa fa-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="text" name="taiKhoan" disabled={true}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-0">
                  <Label>Mật khẩu</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-warning text-light">
                        <i className="fa fa-key"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="password" name="matKhau" />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-0">
                  <Label>Họ tên</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-warning text-light">
                        <i className="fa fa-info-circle"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="text" name="hoTen" />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-0">
                  <Label>Số điện thoại</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-warning text-light">
                        <i className="fa fa-phone"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="text" name="soDT" />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-0">
                  <Label>Mã loại người dùng</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-warning text-light">
                        <i className="fa fa-wrench"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="text" name="maLoaiNguoiDung" />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-0">
                  <Label>Email</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-warning text-light">
                        <i className="fa fa-envelope"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="text" name="email" disabled={true}/>
                  </InputGroup>
                </FormGroup>
                <div className="d-flex justify-content-end mt-3">
                  
                    <Button
                      color="primary"
                      onClick={() => {
                        handleSubmit();
                        ;
                      }}
                    className="mr-2">
                      <i className="fa fa-edit mr-2"></i>Chỉnh sửa
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => dispatch(onToggleModal(false))}
                    >
                      <i className="fa fa-times  mr-2"></i>Hủy
                    </Button>
                 
                </div>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default FormEditUsers;
