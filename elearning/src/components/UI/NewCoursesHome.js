import React from "react";
import Slider from "react-slick";
import StarIcon from "@material-ui/icons/Star";
import styles from "../../styles/Layout/courselisthome.module.scss";
import { settings } from "./CourseListHome";

const NewCoursesHome = props => {
  const renderCheckNewDate = item => {
    if (item.ngayTao > "06/02/2020") {
      return (
        <div className="pr-2" key={item.maKhoaHoc}>
          <div
            className={`card border-0 ${styles.cardCourses}`}
            onClick={() =>
              props.propsHome.history.push(`/course-detail/${item.maKhoaHoc}`)
            }
          >
            <div className={styles.divImage}>
              <img
                className="card-img-top"
                src={item.hinhAnh}
                alt="images"
                width="100%"
                height={130}
              />
              <div className={styles.divInsideImage}></div>
            </div>

            <div className="card-body pl-0">
              <h6 className="card-title mb-0">{item.tenKhoaHoc}</h6>
              <p className={`card-text ${styles.inStrucTor}`}>
                {item.nguoiTao && item.nguoiTao.hoTen}
              </p>
              <div>
                <span className={styles.ratingStar}>5.0</span>
                <StarIcon className={styles.iconStar} />
                <StarIcon className={styles.iconStar} />
                <StarIcon className={styles.iconStar} />
                <StarIcon className={styles.iconStar} />
                <StarIcon className={styles.iconStar} />
              </div>
              {item.luotXem === 0 ? <h6>Free</h6> : <h6>${item.luotXem}</h6>}
              <div>
                <span className={styles.newCourse}>New</span>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };
  return (
    <div className={styles.courseListHomeContainer}>
      <h3 className="mt-3 mb-3">Khóa Học Mới Nhất</h3>
      <div>
        {props.isFetch ? (
          <Slider {...settings}>
            {props.listCourses.map(item => renderCheckNewDate(item))}
          </Slider>
        ) : (
          <div>Loading....</div>
        )}
      </div>
    </div>
  );
};
export default NewCoursesHome;
