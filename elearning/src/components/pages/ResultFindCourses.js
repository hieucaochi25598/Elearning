import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LazyLoad from "react-lazyload";
import { findCourse } from "../../actions/courseAction";
import styles from "../../styles/Layout/resultfindcourses.module.scss";
import StarIcon from "@material-ui/icons/Star";
import { Loading } from "./UserDetail";
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { useState } from "react";
const ResultFindCourses = props => {
  const dispatch = useDispatch();
  const { listCoursesFound } = useSelector(state => state.courseReducer);
  const { tenKhoaHoc } = props.match.params;
  const [isFind, setIsFind] = useState(false);
  useEffect(() => {
    dispatch(findCourse(tenKhoaHoc, handleSuccess));
  }, []);
  const handleSuccess = () => {
    setIsFind(true);
  };

  return (
    <div className={styles.resultCourses}>
      <div className={styles.resultTitle}>
        <div className={styles.resultTitleContent}>
          {isFind && listCoursesFound.length === 0 ? (
            <>
            <strong>
              <h4 className="mb-5">Không tìm thấy kết quả với "{tenKhoaHoc}"</h4>
            </strong>
            <p><YoutubeSearchedForIcon fontSize="large"/> Hãy thử tìm kiếm với kết quả khác:</p>
            <ul>
              <li>Hãy chắc chắn rằng các từ bạn nhập đúng chính tả</li>
              <li>Hãy thử các thuật ngữ tìm kiếm khác nhau</li>
              <li>Hãy thử các thuật ngữ tìm kiếm chung</li>
            </ul>
            
            </>
          ) : (
            <p>
              {listCoursesFound.length} kết quả được tìm thấy với{" "}
              <strong>"{tenKhoaHoc}"</strong>
            </p>
          )}
        </div>
      </div>
      <div className={styles.listCoursesFoundContainer}>
        <div className="row">
          <div className="col-9">
            <div className={styles.listCoursesFound}>
              <h3>Danh sách khóa học</h3>
              {isFind ? (
                listCoursesFound.length !== 0 ? (
                  listCoursesFound.map(item => (
                    <LazyLoad
                      height={100}
                      offset={[-50, 100]}
                      key={item.maKhoaHoc}
                      placeholder={<Loading />}
                    >
                      <div
                        className={styles.listCoursesFoundContent}
                        key={item.maKhoaHoc}
                      >
                        <div className="row">
                          <div className="col-3">
                            <img
                              src={item.hinhAnh}
                              alt="img"
                              width="100%"
                              height={110}
                            />
                          </div>
                          <div className="col-6">
                            <div className={styles.listCoursesText}>
                              <h5>{item.tenKhoaHoc}</h5>
                              <span className={styles.sellText}>
                                <strong>Best Seller</strong>
                              </span>
                              <p className="text-success mt-2">
                                Cập nhật <strong>{item.ngayTao}</strong>
                              </p>
                              <p className={styles.fullName}>
                                {item.nguoiTao && item.nguoiTao.hoTen}
                              </p>
                              <p className={styles.courseTitle}>
                                {item.danhMucKhoaHoc &&
                                  item.danhMucKhoaHoc.tenDanhMucKhoaHoc}
                              </p>
                            </div>
                          </div>
                          <div className="col-3 text-right pr-5">
                            {item.luotXem === 0 ? (
                              <h5>Free</h5>
                            ) : (
                              <h5>${item.luotXem}</h5>
                            )}
                            <div>
                              <span>
                                <StarIcon className={styles.starIcons} />
                              </span>
                              <span>
                                <StarIcon className={styles.starIcons} />
                              </span>
                              <span>
                                <StarIcon className={styles.starIcons} />
                              </span>
                              <span>
                                <StarIcon className={styles.starIcons} />
                              </span>
                              <span>
                                <StarIcon className={styles.starIcons} />
                              </span>
                              <span className={styles.starNumber}>5.0</span>
                            </div>
                            <p className={styles.ratingNumber}>
                              (1000+ đánh giá)
                            </p>
                          </div>
                        </div>
                      </div>
                    </LazyLoad>
                  ))
                ) : (
                  <div><SentimentVeryDissatisfiedIcon fontSize="large"/></div>
                )
              ) : (
                <div>Loading.....</div>
              )}
            </div>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
};
export default ResultFindCourses;
