import React, { useEffect } from "react";
import styles from "../../styles/Layout/courselisthome.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCourseListAll } from "../../actions/courseAction";
import "slick-carousel/slick/slick.css"; 
import "../../styles/Component/customize.scss"
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import StarIcon from "@material-ui/icons/Star";
import { useState } from "react";
export const settings = {
  dots: false,
  infinite: true,
  speed: 400,
  autoplay: true,
  cssEase: "linear",
  autoplaySpeed: 5000,
  slidesToShow: 5,
  slidesToScroll: 1
};
const CourseListHome = (props) => {
  
  return (
    <div className={styles.courseListHomeContainer}>
      <h3 className="mt-3 mb-3">Danh Sách Khóa Học</h3>
      <div>
        {props.isFetch ? (
            <Slider {...settings}>
          {props.listCourses.map(item => (
              <div className="pr-2" key={item.maKhoaHoc} >
                  
            <div className={`card border-0 ${styles.cardCourses}`} onClick={() => props.propsHome.history.push(`/course-detail/${item.maKhoaHoc}`)}>
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
                <p className={`card-text ${styles.inStrucTor}`}>{item.nguoiTao && item.nguoiTao.hoTen}</p>
                <div>
                <span className={styles.ratingStar}>5.0</span>
                <StarIcon className={styles.iconStar} />
                <StarIcon className={styles.iconStar} />
              <StarIcon className={styles.iconStar} />
              <StarIcon className={styles.iconStar} />
              <StarIcon className={styles.iconStar} />
              
            </div>
                {item.luotXem === 0 ? <h6>Free</h6> : (<h6>${item.luotXem}</h6>)}
                <div>
                    <span className={styles.bestSeller}>BestSeller</span>
                </div>
              </div>
            </div>
            </div>
          ))}
          </Slider>
        ) : (
          <div>Loading....</div>
        )}
      </div>
    </div>
  );
};
export default CourseListHome;
