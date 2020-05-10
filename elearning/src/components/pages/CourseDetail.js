import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourseDetail } from "../../actions/courseAction";
import {Spinner} from 'reactstrap'
import {
  signUpCourse,
  commentCourse,
  getCommentCourse,
  addToCart,
  layDanhSachKhoaHocDaXetDuyet,
  layDsLinkTaiLieu
} from "../../actions/userActions";
import { Formik, Form } from "formik";
import { MyInput } from "./FormEditAccount";
import { Button } from "reactstrap";

const CourseDetail = ({ ...props }) => {
  const dispatch = useDispatch();
  const { maKhoaHoc } = props.match.params;
  const { courseDetail } = useSelector(state => state.courseReducer);
  const { commentArray, danhSachKHDaXetDuyet, danhSachLinkTaiLieu} = useSelector(state => state.userReducer);
  useEffect(() => {
    dispatch(getCourseDetail(maKhoaHoc));
    dispatch(getCommentCourse(maKhoaHoc));
    dispatch(layDanhSachKhoaHocDaXetDuyet())
    dispatch(layDsLinkTaiLieu(maKhoaHoc));
  }, []);
  const renderDocument = (course) => {
    const index = danhSachKHDaXetDuyet.findIndex(item => item.maKhoaHoc === course.maKhoaHoc)
    if(index !== -1){
      return (<div className="container mt-4">
        <h3>Tài liệu học tập</h3>
        {danhSachLinkTaiLieu.length !== 0 ?( danhSachLinkTaiLieu.map(item => (
          <div key={item.url}>
            <h4>{item.tenTaiLieu}</h4>
            <a href={item.url}>{item.url}</a>
          </div>
        ))): (<div><Spinner color="primary" style={{ width: '3rem', height: '3rem' }}/></div>)}
      </div>)
    }
  }
  console.log(danhSachLinkTaiLieu)
  return (
    <div>
      <div className="bg-dark text-white pt-4 pb-4">
        <div className="container">
          <h1>{courseDetail.tenKhoaHoc}</h1>
          {courseDetail.nguoiTao && <h3>{courseDetail.nguoiTao.hoTen}</h3>}
          {courseDetail.danhMucKhoaHoc && (
            <h4>{courseDetail.danhMucKhoaHoc.tenDanhMucKhoaHoc}</h4>
          )}
        </div>
      </div>
            <div className="container">
                <div className="row mt-4" style={{position:"relative"}}>
                    <div className="col-8">
                            <div className="bg-light p-4">
                                <h2>Nội dung bài học</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio delectus esse, blanditiis alias quidem iste quae labore voluptatibus. Asperiores sit commodi architecto dolore atque eos esse, cum, cupiditate voluptatibus aut aperiam tempora quam, veritatis quisquam hic quod neque eaque incidunt harum consectetur sint obcaecati fugiat impedit numquam! Neque iste perspiciatis dolores dolorum. Veritatis impedit, dicta iure nam eius laudantium atque!
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, atque maxime rerum dolorum voluptatem non molestias sequi commodi perspiciatis quae nemo voluptatibus voluptatum laboriosam asperiores totam enim minus reiciendis tenetur?
                                </p>
                            </div>
                    </div>
                    <div className="col-4" style={{position: "absolute", top:"-52%", right: "0"}}>
                    <div className="card">
          <img
            className="card-img-top"
            src={courseDetail.hinhAnh}
            alt="images"
            width="100%"
            height={200}
          />
          <div className="card-body">
            <h2 className="card-title">${courseDetail.luotXem}</h2>
            <button onClick={() => dispatch(addToCart(courseDetail, ()=>{}))} className="btn btn-danger" style={{width: "100%", borderRadius:"unset"}}>Thêm giỏ hàng</button>
          <p className="mt-3">Ngày tạo: {courseDetail.ngayTao}</p>
          <p>Giảng viên: {courseDetail.nguoiTao && courseDetail.nguoiTao.hoTen}</p>
          <p>Loại khóa học: {courseDetail.danhMucKhoaHoc && courseDetail.danhMucKhoaHoc.tenDanhMucKhoaHoc}</p>
          </div>
        </div>
                    </div>
                </div>
            </div>
      {/* Do luc dau chay render truoc nen object luc dau se bi rong nen can phai qua buoc kiem tra */}
      {renderDocument(courseDetail)}
      <div className="container mt-4">
          <h3>Bình luận và đánh giá</h3>
      {commentArray.map((item, index) => (
        <React.Fragment key={index}>
          <p>{item.taiKhoan}</p>
          <p>{item.comment}</p>
        </React.Fragment>
      ))}
      <Formik
        initialValues={{
          comment: ""
        }}
        onSubmit={values => dispatch(commentCourse(values))}
      >
        {({ handleSubmit }) => (
          <Form>
            <MyInput name="comment" type="textarea"/>
            <Button color="primary" onClick={handleSubmit} className="mt-3">
              Gửi bình luận
            </Button>
          </Form>
        )}
      </Formik>
      </div>
      {/* <button className="btn btn-success" onClick={() => {dispatch(signUpCourse(courseDetail.maKhoaHoc,handleSuccess))}}>Dang ky khoa hoc</button> */}
      
    </div>
  );
};
export default CourseDetail;
