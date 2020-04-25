import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
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
  import { onToggleModal, editAccountInfo } from "../../actions/userActions";
  import { Formik, Form, useField } from "formik";
  import { addUser } from "../../actions/usersAction";
  import { InputGroupAddon, InputGroupText, Input } from "reactstrap";
  import { MyInput } from "./FormEditAccount";
  import * as yup from "yup";
import { themKhoaHoc } from '../../actions/courseAction';
export const MySelect = ({courseTitle, ...props}) => {
    const [field, meta] = useField(props);
    return <select {...field} {...props}>
        {courseTitle.map(item => (
            <option key={item.maDanhMuc} value={item.maDanhMuc}>
                {item.tenDanhMuc}
            </option>
        ))}
    </select>
}
const FormAddCourse = (props) => {
    const { courseChosen, courseTitle } = useSelector(
        state => state.courseReducer
      );
    
    const dispatch = useDispatch()
    const [file, setFile] = useState("");
    const handleChangeFile = e => {
        setFile(e.target.files[0]);
    }
    return (
        <div>
            <Modal isOpen={props.isOpenCourse} toggle={() => props.handleCloseModalCourse()}>
        <ModalHeader>Thêm người dùng</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
                maKhoaHoc: "",
                biDanh: "",
                tenKhoaHoc: "",
                moTa: "",
                hinhAnh: "",
                maDanhMucKhoaHoc: "",
            }}
            onSubmit={values => {
                dispatch(themKhoaHoc({...values, hinhAnh: file}));
                props.handleCloseModalCourse()
            }}
        
          >
            {({ handleSubmit }) => (
              <Form>
                <FormGroup className="mb-0">
                  <Label>Mã khóa học</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-warning text-light"><i className="fa fa-user"></i></InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="text" name="maKhoaHoc" />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-0">
                  <Label>Bí danh</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-warning text-light"><i className="fa fa-key"></i></InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="password" name="biDanh" />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-0">
                  <Label>Tên khóa học</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-warning text-light"><i className="fa fa-info-circle"></i></InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="text" name="tenKhoaHoc" />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-0">
                  <Label>Mô tả</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-warning text-light"><i className="fa fa-phone"></i></InputGroupText>
                    </InputGroupAddon>
                    <MyInput type="text" name="moTa" />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-0">
                  <Label>Hình ảnh</Label>
                  <InputGroup>
                    
                    <MyInput type="file" name="hinhAnh" onChange={handleChangeFile}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-0">
                  <Label>Mã danh mục</Label>
                  <InputGroup>
                    <MySelect name="maDanhMucKhoaHoc" courseTitle={[{ tenDanhMuc: "Chọn danh mục khóa học", maDanhMuc: ""}, ...courseTitle
                        // [
                        //     { tenDanhMuc: "Chọn danh mục khóa học", maDanhMuc: ""},
                        //     { tenDanhMuc: "Lập trình BackEnd", maDanhMuc: "BackEnd" },
                        //     { tenDanhMuc: "Lập trình FrontEnd", maDanhMuc: "FrontEnd" },
                        //     { tenDanhMuc: "Lập trình di động", maDanhMuc: "DiDong" },
                        //     { tenDanhMuc: "Thiết kế Web", maDanhMuc: "Design" },
                        //     { tenDanhMuc: "Lập trình FullStack", maDanhMuc: "FullStack" },
                        //     { tenDanhMuc: "Tư duy lập trình", maDanhMuc: "TuDuy" },
                        // ]
                    ]}/>
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
                    onClick={() => props.handleCloseModalCourse()}
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
    )
}
export default FormAddCourse
