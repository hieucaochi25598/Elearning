import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import UserLayout from './components/layout/UserLayout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, getAccountInfo, addToCartAction, getCartArrayAction, calTotalPrice, getWishList, getCartArray, layDanhSachKhoaHocDaXetDuyet } from './actions/userActions';
import CourseList from './components/pages/CourseList';
import CourseDetail from './components/pages/CourseDetail';
import UserAuth from './Auth/UserAuth';
import { setAuthorization } from './util/axios';
import UserDetail from './components/pages/UserDetail';
import AdminLayout from './components/layout/AdminLayout';
import CourseManagement from './components/pages/CourseManagement';
import AdminAuth from './Auth/AdminAuth';
import UserManagement from './components/pages/UserManagement';
import UserDetailAdmin from './components/pages/UserDetailAdmin';
import ListUserCourse from './components/pages/ListUserCourse';
import ListUserNotCourse from './components/pages/ListUserNotCourse';
import ListUserWaitCourse from './components/pages/ListUserWaitCourse';
import ListCourseNotEnroll from './components/pages/ListCourseNotEnroll';
import ListCourseEnrolled from './components/pages/ListCourseEnrolled';
import ListCourseWaitEnrolled from './components/pages/ListCourseWaitEnrolled';
import './firebaseConfig'
import './styles/Base/reset.scss'
import ResultFindCourses from './components/pages/ResultFindCourses';
import CartList from './components/pages/CartList';
import WishList from './components/pages/WishList';
import UserDetailAdminLayout from './components/layout/UserDetailAdminLayout';
import MyCourseOfUser from './components/pages/MyCourseOfUser';

function App() {
  const dispatch = useDispatch()
  const {cartArray} = useSelector(state => state.userReducer)
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    
    if (userInfo) {
      
      setAuthorization(userInfo.accessToken)
      dispatch(getUserInfo(userInfo))
      dispatch(getAccountInfo())
      dispatch(getWishList())
      dispatch(getCartArray())
      dispatch(layDanhSachKhoaHocDaXetDuyet())
    }
  }, [])
  useEffect(() => {
    dispatch(calTotalPrice())
  }, [cartArray])
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* Admin Route */}
        <AdminLayout path="/admin">
          <Switch>
          <Route exact path="/admin" component={() => (<Redirect to="/admin/courses-management"/>)}/>
            <AdminAuth path="/admin/courses-management" component={CourseManagement} />
            <AdminAuth path="/admin/users-management" component={UserManagement}/>
            <AdminAuth path="/admin/list-user-course/:maKhoaHoc" component={ListUserCourse}/>
            <AdminAuth path="/admin/list-user-not-course/:maKhoaHoc" component={ListUserNotCourse}/>
            <AdminAuth path="/admin/list-user-wait-course/:maKhoaHoc" component={ListUserWaitCourse}/>
            <UserDetailAdminLayout path="/admin/user-detail">
              <Switch>
                <AdminAuth path="/admin/user-detail/list-course-enrolled/:taiKhoan" component={ListCourseEnrolled}/>
                <AdminAuth path="/admin/user-detail/list-course-wait-enrolled/:taiKhoan" component={ListCourseWaitEnrolled}/>
                <AdminAuth path="/admin/user-detail/list-course-not-enroll/:taiKhoan" component={ListCourseNotEnroll}/>
              </Switch>
            </UserDetailAdminLayout>
          </Switch>
        </AdminLayout>

        {/* Nguoi Dung Route */}
        <UserLayout path="/">
          {/* <Redirect to="/home" component={Home} /> */}
          <Switch>
            <Route exact path="/" component={() => (<Redirect to="/home"/>)}/>
            <Route path="/home" component={Home} />
            <Route path="/course-list" component={CourseList} />
            <UserAuth path="/my-courses" component={MyCourseOfUser}/>
            <Route path="/result-courses/:tenKhoaHoc" component={ResultFindCourses}/>
            <UserAuth path="/course-detail/:maKhoaHoc" component={CourseDetail} />
            <UserAuth path="/account-info/:taiKhoan" component={UserDetail}/>
            <UserAuth path="/cart-list" component={CartList}/>
            <UserAuth path="/wish-list" component={WishList}/>
          </Switch>
        </UserLayout>
      </Switch>
    </div>
  );
}

export default App;
