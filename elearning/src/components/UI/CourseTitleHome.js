import React from "react";
import styles from "../../styles/Layout/coursetitlehome.module.scss";
const CourseTitleHome = () => {
  return (
    <div className={styles.courseTitleHomeContainer}>
      <h3 className="mt-4 mb-4">Các Khóa Học Online</h3>
      <div>
        <div className="row">
          <div className="col-4">
            <div className={styles.courseTitleContent}>
              <div className="row">
                <div className="col-3">
                  <i className={`fa fa-database ${styles.iconTitle}`}></i>
                </div>
                <div className="col-9">
                  <h4>Lập trình Back-End</h4>
                  <p className="mb-0">
                    Các khóa học liên quan về cơ sở dữ liệu SQL, MySQL,... kết hợp với NodeJS,
                    Java, PHP, Python. 
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className={styles.courseTitleContent}>
              <div className="row">
                <div className="col-3">
                  <i className={`fa fa-code ${styles.iconTitle}`}></i>
                </div>
                <div className="col-9"><h4>Lập trình Front-End</h4>
                  <p className="mb-0">
                    Các khóa học về HTML, CSS, JS, BootStrap 4, React JS, Angular JS, Vue JS từ cơ bản đến nâng cao.
                  </p></div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className={styles.courseTitleContent}>
              <div className="row">
                <div className="col-3">
                  <i className={`fab fa-android ${styles.iconTitle}`}></i>
                </div>
                <div className="col-9"><h4>Lập trình di động</h4>
                  <p className="mb-0">
                    Các khóa học về Android Studio, Flutter, React Native,... từ cơ bản đến nâng cao.
                  </p></div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className={styles.courseTitleContent}>
              <div className="row">
                <div className="col-3">
                  <i className={`fa fa-brain ${styles.iconTitle}`}></i>
                </div>
                <div className="col-9"><h4>Tư duy lập trình</h4>
                  <p className="mb-0">
                    Các khóa học về tư duy lập trình thuật toán qua các ngôn ngữ C/C++, Java, C#,...
                  </p></div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className={styles.courseTitleContent}>
              <div className="row">
                <div className="col-3">
                  <i
                    className={`fa fa-drafting-compass ${styles.iconTitle}`}
                  ></i>
                </div>
                <div className="col-9"><h4>Thiết kế Web</h4>
                  <p className="mb-0">
                    Chuyên sâu về Adobe Photoshop, Adobe Lightroom, Adobe Illustrator,... Thiết kế Web từ cơ bản đến nâng cao.
                  </p></div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className={styles.courseTitleContent}>
              <div className="row">
                <div className="col-3">
                  <i className={`fa fa-rocket ${styles.iconTitle}`}></i>
                </div>
                <div className="col-9"><h4>Lập trình FullStack</h4>
                  <p className="mb-0">
                    Các khóa học NodeJS/VueJS, NodeJS/ReactJS,... Xây dựng một ứng dụng web hoàn chỉnh.
                  </p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseTitleHome;
