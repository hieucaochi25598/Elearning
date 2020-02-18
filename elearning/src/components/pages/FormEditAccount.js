import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  FormFeedback,
  Label
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { onToggleModal, editAccountInfo } from "../../actions/userActions";
import { Formik, Form, useField } from "formik";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import InfoIcon from '@material-ui/icons/Info';
import EmailIcon from '@material-ui/icons/Email';
import NoteIcon from '@material-ui/icons/Note';
import PhoneIcon from '@material-ui/icons/Phone';
import EditIcon from '@material-ui/icons/Edit';
import * as yup from "yup";
export const MyInput = ({ ...props }) => {
  const [field, meta] = useField(props);
  //field bao gom onChange, onBlur, name, value
  //meta bao gom error, touched, ...
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <React.Fragment>
      <Input
        {...field}
        {...props}
        invalid={meta.error && meta.touched ? true : false}
        valid={!meta.error && meta.touched ? true : false}
      />
      <FormFeedback>{errorText}</FormFeedback>
    </React.Fragment>
  );
};

const validationSchema = yup.object({
  taiKhoan: yup
    .string()
    .required("Vui lòng nhập tài khoản")
    .max(50, "Tài khoản không được quá 50 ký tự")
    .min(5, "Tài khoản phải có ít nhất 5 ký tự"),
  matKhau: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(5, "Mật khẩu phải ít nhất 6 ký tự")
    .max(30, "Mật khẩu không được quá 30 ký tự"),
  hoTen: yup.string().required("Vui lòng nhập họ tên"),
  soDT: yup
    .string()
    .required("Vui lòng nhập số diện thoại")
    .matches(/(09|01[2|6|8|9])+([0-9]{8})\b/g, "Số điện thoại không đúng"),
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim,
      "Email không đúng"
    )
});

const FormEditAccount = () => {
  const { isOpen, accountInfo } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const handleEditSuccess = () => {
    dispatch(onToggleModal(false));
  };
  // useEffect(() => {
  //     const {taiKhoan , matKhau, hoTen, soDT, maLoaiNguoiDung, email} = accountInfoChosing

  // }, [accountInfoChosing])

  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => dispatch(onToggleModal(false))}>
        <ModalHeader><EditIcon className="mr-2"/>Chỉnh sửa thông tin</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              taiKhoan: accountInfo.taiKhoan,
              matKhau: accountInfo.matKhau,
              hoTen: accountInfo.hoTen,
              soDT: accountInfo.soDT,
              maLoaiNguoiDung: accountInfo.maLoaiNguoiDung,
              email: accountInfo.email
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
              dispatch(editAccountInfo(values));
              handleEditSuccess();
            }}
          >
            {({ handleSubmit }) => (
              <Form>
                <FormGroup>
                  <Label>Tài khoản</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><PersonIcon/></InputGroupText>
                    </InputGroupAddon>
                    <MyInput
                      type="text"
                      name="taiKhoan"
                      disabled="true"
                      label="Username"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label>Mật khẩu</Label>

                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><LockIcon/></InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="text" name="matKhau" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label>Họ tên</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><InfoIcon/></InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="text" name="hoTen" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label>Số điện thoại</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><PhoneIcon/></InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="text" name="soDT" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><EmailIcon/></InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="text" name="email" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label>Mã loại người dùng</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><NoteIcon/></InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="text" name="maLoaiNguoiDung" />
                  </InputGroup>
                </FormGroup>

                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Do Something
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => dispatch(onToggleModal(false))}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default FormEditAccount;
