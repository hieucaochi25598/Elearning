import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import FileUploader from "react-firebase-file-uploader";
import Swal from "sweetalert2"
import {
  getCourseList,
  deleteCourse,
  courseChosenAction,
  getUserListOfCourse,
  findCourse,
  findCourseAdmin,
  getCourseTitle,
  uploadStartAction,
  uploadSuccessAction
} from "../../actions/courseAction";
import PaginationComponent from "../layout/Pagination";
import useFetchCoursesList from "../../customHook/useFetchCourseList";
import { MyTextField } from "./Signup";
import { Formik } from "formik";
import { Form, FormGroup } from "reactstrap";
import SearchIcon from "@material-ui/icons/Search";
import { onToggleModal } from "../../actions/userActions";
import { InputAdornment } from "@material-ui/core";
import FormAddCourse from "./FormAddCourse";
import { useState } from "react";
import FormEditCourse from "./FormEditCourse";
import { firebaseApp } from "../../firebaseConfig";
const CourseManagement = props => {
  const { courseChosen, courseTitle,document, documentUrl, progress } = useSelector(
    state => state.courseReducer
  );
  const [isOpenCourse, setIsOpenCourse] = useState(false)
  const [isOpenEditCourse, setIsOpenEditCourse] = useState(false)
  const [initialDocument, setInitialDocument]=useState({
    document:'',
    progress: 0
  })
  const [initialBaiTap, setInitialBaiTap] = useState({
    baitap: '',
    progressBaiTap: 0
  })
  const {
    listCourses,
    currentPage,
    totalCount,
    onChangePage,
    isFetch
  } = useFetchCoursesList();
  const dispatch = useDispatch();
  const handleCloseModalCourse = () => {
    setIsOpenCourse(false)
  }
  const handleCloseModalEditCourse = () =>{
    setIsOpenEditCourse(false)
  }
 
  useEffect(() => {
    dispatch(getCourseTitle())
  }, [])
  const handleUpLoadStart = () => {
    setInitialDocument({...initialDocument,progress: 0})
  }
  const handleUploadStartBaiTap = () => {
    setInitialBaiTap({...initialBaiTap, progress: 0})
  }
  const handleUploadSuccessBaiTap = (filename) => {
    setInitialBaiTap({...initialBaiTap, baitap: filename, progressBaiTap: 100})
  }
  const handleUploadSuccess = (filename) => {
    setInitialDocument({...initialDocument, document: filename, progress: 100})
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Thêm thành công',
      showConfirmButton: false,
      timer: 2500
  })
    // firebaseApp.storage().ref(`${courseChosen.maKhoaHoc}`).child(filename).getDownloadURL().then(url => setInitialDocument({...initialDocument, documentUrl: url}))
    // var listRef = firebaseApp.storage().ref().child(`${courseChosen.maKhoaHoc}`);
    // listRef.listAll().then(function(res) {
    //   // res.prefixes.forEach(function(folderRef) {
    //   //   // All the prefixes under listRef.
    //   //   // You may call listAll() recursively on them.
    //   //   console.log(folderRef)
    //   // });
    //   var documentUrl = []
    //   res.items.forEach(function(itemRef) {
    //     // All the items under listRef.
    //     itemRef.getDownloadURL().then(url => documentUrl.push())
    //     console.log(itemRef)
    //   });
    //   console.log(documentUrl)
    // }).catch(function(error) {
    //   // Uh-oh, an error occurred!
    // });
  }
  console.log(initialDocument)
  return (
    <div>
      <FormAddCourse isOpenCourse={isOpenCourse} handleCloseModalCourse={handleCloseModalCourse}/>
      <FormEditCourse isOpenEditCourse={isOpenEditCourse} handleCloseModalEditCourse={handleCloseModalEditCourse}/>
      <h2>DANH SÁCH KHÓA HỌC</h2>
      <div className="d-flex justify-content-between">
      <button
        className="btn btn-success mb-3"
        onClick={() => setIsOpenCourse(true)}
      >
        <i className="fa fa-plus-circle mr-2"></i>Thêm khóa học
      </button>
      <div>
        <Formik
          initialValues={{
            tenKhoaHoc: ""
          }}
        onSubmit={values => dispatch(findCourseAdmin(values.tenKhoaHoc))}>
          {({ handleSubmit }) => (
            <FormGroup>
              <MyTextField
                name="tenKhoaHoc"
                type="text"
                label="Tìm kiếm khóa học"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={handleSubmit}
                    >
                      <SearchIcon
                        fontSize="large"
                        style={{ cursor: "pointer" }}
                      />
                    </InputAdornment>
                  )
                }}
              />
            </FormGroup>
          )}
        </Formik>
      </div>
      </div>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Mã khóa học</th>
            <th>Tên khóa học</th>
            <th>Ngày tạo</th>
            <th>Tên danh mục</th>
            <th className="text-center">Tác vụ</th>
          </tr>
        </thead>
        <tbody>
          {listCourses.map(item => (
            <tr key={item.maKhoaHoc}>
              <td className="align-middle">{item.maKhoaHoc}</td>
              <td className="align-middle"><img src={item.hinhAnh} alt="images" height={50} width={70} className="mr-2"/>{item.tenKhoaHoc}</td>
              <td className="align-middle">{item.ngayTao}</td>
              {item.danhMucKhoaHoc && (
                <td className="align-middle">{item.danhMucKhoaHoc.tenDanhMucKhoaHoc}</td>
              )}
              <td className="align-middle text-center">
                <div>
                
                <FileUploader
                    onClick={() => dispatch(courseChosenAction(item))}
                  
                    accept="document/*"
                    name="document"
                    storageRef={firebaseApp.storage().ref(`${item.maKhoaHoc}`)}
                    onUploadStart={handleUpLoadStart}
                    onUploadSuccess={handleUploadSuccess}
                    className="mb-2"
                />

                <FileUploader
                accept="baitap/*"
                name="baitap"
                storageRef={firebaseApp.storage().ref(`/baiTap/${item.maKhoaHoc}`)}
                onUploadStart={handleUploadStartBaiTap}
                onUploadSuccess={handleUploadSuccessBaiTap}
                className="mb-2"
                />
                <br/>
                <button
                  className="btn btn-warning mr-2 mb-2"
                  onClick={() => {
                    props.history.push(
                      `/admin/list-user-course/${item.maKhoaHoc}`
                    );
                    dispatch(getUserListOfCourse(item.maKhoaHoc));
                    dispatch(courseChosenAction(item))
                  }}
                >
                  Danh sách học viên
                </button>
                <button
                  className="btn btn-info mr-2 mb-2"
                  onClick={() => {
                    props.history.push(
                      `/admin/list-user-not-course/${item.maKhoaHoc}`
                    );
                    dispatch(courseChosenAction(item));
                  }}
                >
                  DSHV chưa ghi danh
                </button>
                </div>
                <button
                  className="btn btn-success mr-2 mb-2"
                  onClick={() => {
                    props.history.push(
                      `/admin/list-user-wait-course/${item.maKhoaHoc}`
                    );
                    dispatch(courseChosenAction(item));
                  }}
                >
                  DSHV chờ xét duyệt
                </button>
                <button className="btn btn-primary mr-2 mb-2"
                onClick={() => {setIsOpenEditCourse(true); dispatch(courseChosenAction(item))}}>Chỉnh sửa</button>
                <button
                  className="btn btn-danger mr-2 mb-2"
                  style={{width:"64px"}}
                  onClick={() => dispatch(deleteCourse(item.maKhoaHoc))}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="row justify-content-center mt-4">
            <PaginationComponent
              pageSize={10}
              currentPage={currentPage}
              totalCount={totalCount}
              onChangePage={onChangePage}
            />
          </div>
    </div>
  );
};
export default CourseManagement;
