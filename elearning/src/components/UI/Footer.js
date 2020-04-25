import React from "react";
import styles from "../../styles/Layout/footer.module.scss";
import { Formik, Form } from "formik";
import { Button, FormGroup, Label } from "reactstrap";
import { MyInput } from "../pages/FormEditAccount";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { sendFeedBack } from "../../actions/userActions";
const validationSchema = yup.object({
  yourFeedBack: yup.string().required("Hãy viết phản hồi của bạn.")
});

const Footer = () => {
  const { userInfo } = useSelector(state => state.userReducer);
  const dispatch = useDispatch()
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className="row">
          <div className="col-6">
            <h2>Liên Hệ</h2>
            <p>
              <i className="fa fa-map-marker-alt"></i>227 Nguyễn Văn Cừ, Quận 5,
              TP Hồ Chí Minh
            </p>
            <p>
              <i className="fas fa-phone-alt"></i>Điện thoại: 0941237751
            </p>
            <p>
              <i className="fa fa-envelope"></i>Email: hieucaochi25598@gmail.com
            </p>
          </div>
          <div className="col-6">
            <h2>Phản hồi của bạn</h2>
            <Formik
              initialValues={{
                yourFeedBack: ""
              }}
              onSubmit={values => dispatch(sendFeedBack(values))}
              validationSchema={validationSchema}
            >
              {({ handleSubmit }) => (
                <Form>
                  <FormGroup>
                    <MyInput
                      type="textarea"
                      name="yourFeedBack"
                      className={styles.myInput}
                      placeholder="Nội dung"
                    />
                  </FormGroup>
                  <div className={styles.divButtonSubmit}>
                    {Object.keys(userInfo).length !== 0 ? (
                      <Button
                        color="danger"
                        onClick={handleSubmit}
                        className={styles.btnSubmit}
                      >
                        GỬI PHẢN HỒI
                      </Button>
                    ) : (
                      <Button
                        color="danger"
                        className={styles.btnSubmit}
                        tag={Link}
                        to="/login"
                      >
                        GỬI PHẢN HỒI
                      </Button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
