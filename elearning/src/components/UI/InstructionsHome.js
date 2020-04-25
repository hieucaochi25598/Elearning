import React from "react";
import styles from "../../styles/Layout/instructionshome.module.scss";
const InstructionsHome = () => {
  return (
    <div className={styles.instructionContainer}>
      <h2 className="text-center m-5">BLOG</h2>
      <div className={styles.instructionContent}>
        <div className="row">
          <div className="col-3 mb-4">
            <div className={`card border-0 ${styles.cardInstruct}`}>
              <img className="card-img-top" src="./img/insimg1.jpg" alt="images" width="100%" height={140}/>
              <div className="card-body">
                <h5 className="card-title">Làm thế nào để tạo một trang Web - Hướng dẫn toàn diện.</h5>
                <p className="card-text">Đọc thêm</p>
              </div>
            </div>
          </div>
          <div className="col-3 mb-4">
          <div className={`card border-0 ${styles.cardInstruct}`}>
              <img className="card-img-top" src="./img/insimg2.jpg" alt="images" width="100%" height={140}/>
              <div className="card-body">
                <h5 className="card-title">Hướng dẫn cấu hình React-Redux cho Web App trong React JS.</h5>
                <p className="card-text">Đọc thêm</p>
              </div>
            </div>
          </div>
          <div className="col-3 mb-4">
          <div className={`card border-0 ${styles.cardInstruct}`}>
              <img className="card-img-top" src="./img/insimg3.png" alt="images" width="100%" height={140}/>
              <div className="card-body">
                <h5 className="card-title">Một số tip & tricks sẽ giúp bạn kiểm soát ReactJS dễ dàng hơn.</h5>
                <p className="card-text">Đọc thêm</p>
              </div>
            </div>
          </div>
          <div className="col-3 mb-4">
          <div className={`card border-0 ${styles.cardInstruct}`}>
              <img className="card-img-top" src="./img/insimg4.png" alt="images" width="100%" height={140}/>
              <div className="card-body">
                <h5 className="card-title">Sử dụng classnames và BEM để tạo className trong React.
</h5>
                <p className="card-text">Đọc thêm</p>
              </div>
            </div>
          </div>
          <div className="col-3 mb-4">
            <div className={`card border-0 ${styles.cardInstruct}`}>
              <img className="card-img-top" src="./img/insimg1.jpg" alt="images" width="100%" height={140}/>
              <div className="card-body">
                <h5 className="card-title">Làm thế nào để tạo một trang Web - Hướng dẫn toàn diện.</h5>
                <p className="card-text">Đọc thêm</p>
              </div>
            </div>
          </div>
          <div className="col-3 mb-4">
            <div className={`card border-0 ${styles.cardInstruct}`}>
              <img className="card-img-top" src="./img/insimg1.jpg" alt="images" width="100%" height={140}/>
              <div className="card-body">
                <h5 className="card-title">Làm thế nào để tạo một trang Web - Hướng dẫn toàn diện.</h5>
                <p className="card-text">Đọc thêm</p>
              </div>
            </div>
          </div>
          <div className="col-3 mb-4">
            <div className={`card border-0 ${styles.cardInstruct}`}>
              <img className="card-img-top" src="./img/insimg1.jpg" alt="images" width="100%" height={140}/>
              <div className="card-body">
                <h5 className="card-title">Làm thế nào để tạo một trang Web - Hướng dẫn toàn diện.</h5>
                <p className="card-text">Đọc thêm</p>
              </div>
            </div>
          </div>
          <div className="col-3 mb-4">
            <div className={`card border-0 ${styles.cardInstruct}`}>
              <img className="card-img-top" src="./img/insimg1.jpg" alt="images" width="100%" height={140}/>
              <div className="card-body">
                <h5 className="card-title">Làm thế nào để tạo một trang Web - Hướng dẫn toàn diện.</h5>
                <p className="card-text">Đọc thêm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InstructionsHome;
