import React from "react";
import {
  
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  FormFeedback,
  Label
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { onToggleModal, editAccountInfo } from "../../actions/userActions";
import CloseIcon from '@material-ui/icons/Close';
import { Formik, Form, useField } from "formik";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import Button from "@material-ui/core/Button";
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import InfoIcon from '@material-ui/icons/Info';
import EmailIcon from '@material-ui/icons/Email';
import NoteIcon from '@material-ui/icons/Note';
import PhoneIcon from '@material-ui/icons/Phone';
import EditIcon from '@material-ui/icons/Edit';
import styles from '../../styles/Layout/formeditaccount.module.scss'
import * as yup from "yup";
export const MyInput = ({ ...props }) => {
  const [field, meta] = useField(props);
  //field bao gom onChange, onBlur, name, value
  //meta bao gom error, touched, ...
  const errorText = meta.error && meta.touched ? meta.error : "";
  console.log(meta)
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
  matKhau: yup.string()
        .required('*Vui lòng nhập mật khẩu*')
        .max(30, '*Mật khẩu tối đa 30 ký tự*')
        .min(5, '*Mật khẩu ít nhất 5 ký tự*'),
    hoTen: yup.string()
    .required('*Vui lòng nhập họ tên*')
    .max(30, '*Họ tên tối đa 30 ký tự*')
    .min(5, '*Họ tên ít nhất 5 ký tự*')
    .matches(/^([^0-9]*)$/, '*Họ tên không được chứa ký số*'),
    soDT: yup.string()
    .required('*Vui lòng nhập số điện thoại*')
    .matches(/(09|01[2|6|8|9])+([0-9]{8})\b/g, '*Số điện thoại không hợp lệ*'),
  
});

const FormEditAccount = () => {
  const { isOpen, accountInfo } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const handleEditSuccess = () => {
    dispatch(onToggleModal(false));
  };
  

  return (
    <div>
      <Modal className={styles.modalForm} isOpen={isOpen} toggle={() => dispatch(onToggleModal(false))}>
        <ModalHeader className={styles.modalHeader}><EditIcon className="mr-2"/>Chỉnh sửa thông tin</ModalHeader>
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
              <Form className={styles.edtForm}>
                <FormGroup>
                  <Label>Tài khoản</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className={styles.inputText}><PersonIcon/></InputGroupText>
                    </InputGroupAddon>
                    <MyInput
                      type="text"
                      name="taiKhoan"
                      disabled
                      label="Username"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label>Mật khẩu</Label>

                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className={styles.inputText}><LockIcon/></InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="text" name="matKhau" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label>Họ tên</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className={styles.inputText}><InfoIcon/></InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="text" name="hoTen" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label>Số điện thoại</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className={styles.inputText}><PhoneIcon/></InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="text" name="soDT" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className={styles.inputText}><EmailIcon/></InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="text" name="email" disabled/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label>Mã loại người dùng</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className={styles.inputText}><NoteIcon/></InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="text" name="maLoaiNguoiDung" />
                  </InputGroup>
                </FormGroup>
                <div className="text-right mt-4 mb-2">
                <Button
                  className={styles.btnEdit}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                <EditIcon className="mr-1"/> Xác nhận
                </Button>
                <Button
                  className={styles.btnCancle}
                  variant="contained"
                  color="primary"
                  onClick={() => dispatch(onToggleModal(false))}
                >
                <CloseIcon className="mr-1"/> Hủy
                </Button>
                </div>
                  {/* <Button
                    color="primary"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Chỉnh sửa
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => dispatch(onToggleModal(false))}
                  >
                    Hủy
                  </Button> */}
                
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default FormEditAccount;
