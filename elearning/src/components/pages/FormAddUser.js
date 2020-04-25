import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  InputGroup,
  Label
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { onToggleModal, editAccountInfo } from "../../actions/userActions";
import { Formik, Form } from "formik";
import { addUser } from "../../actions/usersAction";
import { InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { MyInput } from "./FormEditAccount";
import * as yup from "yup";
export const validationSchema = yup.object({
    taiKhoan: yup.string()
        .required('*Vui lòng nhập tài khoản*')
        .max(30, '*Tài khoản tối đa 30 ký tự*')
        .min(5, '*Tài khoản ít nhất 5 ký tự*'),
    matKhau: yup.string()
        .required('*Vui lòng nhập mật khẩu*')
        .max(30, '*Mật khẩu tối đa 30 ký tự*')
        .min(5, '*Mật khẩu ít nhất 5 ký tự*'),
    hoTen: yup.string()
        .required('*Vui lòng nhập họ tên*')
        .max(30, '*Họ tên tối đa 30 ký tự*')
        .min(5, '*Họ tên ít nhất 5 ký tự*')
        .matches(/^([^0-9]*)$/, '*Họ tên không được chứa ký số*')
        ,
    maLoaiNguoiDung: yup.string().required("*Vui lòng nhập mã loại người dùng*"),
    soDT: yup.string()
        .required('*Vui lòng nhập số điện thoại*')
        .matches(/(09|01[2|6|8|9])+([0-9]{8})\b/g, '*Số điện thoại không hợp lệ*'),
    email: yup.string()
        .required('*Vui lòng nhập email*')
        .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm
            , '*Email không hợp lệ*')
})
const FormAddUser = () => {
  const { isOpen } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => dispatch(onToggleModal(false))}>
        <ModalHeader>Thêm người dùng</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              taiKhoan: "",
              matKhau: "",
              hoTen: "",
              soDT: "",
              maLoaiNguoiDung: "",
              email: ""
            }}
            onSubmit={values => {
              dispatch(addUser(values));
              dispatch(onToggleModal(false))
            }}
            validationSchema={validationSchema}
          >
            {({ handleSubmit }) => (
              <Form>
                <FormGroup className="mb-0">
                  <Label>Tài khoản</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-warning text-light"><i className="fa fa-user"></i></InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="text" name="taiKhoan" />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-0">
                  <Label>Mật khẩu</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-warning text-light"><i className="fa fa-key"></i></InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="password" name="matKhau" />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-0">
                  <Label>Họ tên</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-warning text-light"><i className="fa fa-info-circle"></i></InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="text" name="hoTen" />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-0">
                  <Label>Số điện thoại</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-warning text-light"><i className="fa fa-phone"></i></InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="text" name="soDT" />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-0">
                  <Label>Mã loại người dùng</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-warning text-light"><i className="fa fa-wrench"></i></InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="text" name="maLoaiNguoiDung" />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-0">
                  <Label>Email</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-warning text-light"><i className="fa fa-envelope"></i></InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="text" name="email" />
                  </InputGroup>
                </FormGroup>
                <div className="d-flex justify-content-end mt-3">
                  <Button
                    color="primary"
                    onClick={handleSubmit}
                    className="mr-2"
                  >
                    <i className="fa fa-plus-circle mr-2"></i>Thêm
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => dispatch(onToggleModal(false))}
                  >
                    <i className="fa fa-trash-alt mr-2"></i>Hủy
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
export default FormAddUser;
