import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import {
  getCourseTitle,
  getCourseFromTitle,
  getCourseList
} from "../../actions/courseAction";
import {
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import styles from "../../styles/Layout/coursetitle.module.scss";
import "aos/dist/aos.css";
import CodeIcon from "@material-ui/icons/Code";
import StorageIcon from "@material-ui/icons/Storage";
import CreateIcon from "@material-ui/icons/Create";
import AndroidIcon from "@material-ui/icons/Android";
import ImportantDevicesIcon from "@material-ui/icons/ImportantDevices";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import { useState } from "react";
export const changeIcon = maDanhMuc => {
  switch (maDanhMuc) {
    case "FrontEnd":
      return <CodeIcon fontSize="small" className="mr-2" />;
    case "BackEnd":
      return <CloudDoneIcon fontSize="small" className="mr-2" />;
    case "Design":
      return <CreateIcon fontSize="small" className="mr-2" />;
    case "DiDong":
      return <AndroidIcon fontSize="small" className="mr-2" />;
    case "FullStack":
      return <ImportantDevicesIcon fontSize="small" className="mr-2" />;
    case "TuDuy":
      return <EmojiObjectsIcon fontSize="small" className="mr-2" />;
    default:
      return null;
  }
};
const CourseTitle = () => {
  const dispatch = useDispatch();
  const { courseTitle } = useSelector(state => state.courseReducer);
  const { currentPage } = useSelector(state => state.courseReducer);
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    dispatch(getCourseTitle());
  }, []);
  return (
    <div>
      <Nav tabs className="mb-3">
        <NavItem>
          <NavLink
            className={`${styles.titleItem} ${activeTab === 0 &&
              `${styles.activeTitle}`}`}
            onClick={() => {
              setActiveTab(0);
              dispatch(getCourseList(currentPage, 10, () => {}));
            }}
          >
            <StorageIcon fontSize="small" className="mr-2" />
            Tất cả
          </NavLink>
        </NavItem>
        {courseTitle.length !== 0 ? (
          courseTitle.map((item, index) => (
            <NavItem key={item.maDanhMuc}>
              <NavLink
                className={`${styles.titleItem} ${activeTab === index + 1 &&
                  `${styles.activeTitle}`}`}
                onClick={() => {
                  setActiveTab(index + 1);
                  dispatch(getCourseFromTitle(item.maDanhMuc));
                }}
              >
                {changeIcon(item.maDanhMuc)} {item.tenDanhMuc}
              </NavLink>
            </NavItem>
          ))
        ) : (
          <div>Loading</div>
        )}
      </Nav>
    </div>
  );
};
export default CourseTitle;
