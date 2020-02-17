import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import UserLayout from './components/layout/UserLayout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserInfo, getAccountInfo } from './actions/userActions';
import CourseList from './components/pages/CourseList';
import CourseDetail from './components/pages/CourseDetail';
import UserAuth from './Auth/UserAuth';
import { setAuthorization } from './util/axios';
import UserDetail from './components/pages/UserDetail';
import FormEditAccount from './components/pages/FormEditAccount';

import SignUpCourses from './components/pages/SignUpCourses';
import UserDetailLayout from './components/layout/UserDetailLayout';
import AdminLayout from './components/layout/AdminLayout';
import CourseManagement from './components/pages/CourseManagement';
import AdminAuth from './Auth/AdminAuth';
import UserManagement from './components/pages/UserManagement';
import FormEditUsers from './components/pages/FormEditUsers';
import UserDetailAdmin from './components/pages/UserDetailAdmin';
import ListUserCourse from './components/pages/ListUserCourse';
import ListUserNotCourse from './components/pages/ListUserNotCourse';
import ListUserWaitCourse from './components/pages/ListUserWaitCourse';
import ListCourseNotEnroll from './components/pages/ListCourseNotEnroll';
import ListCourseEnrolled from './components/pages/ListCourseEnrolled';
import ListCourseWaitEnrolled from './components/pages/ListCourseWaitEnrolled';
import MyCourse from './components/pages/MyCourse';
import MyCourseWaiting from './components/pages/MyCourseWaiting';
import './styles/Base/reset.scss'
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo) {
      setAuthorization(userInfo.accessToken)
      dispatch(getUserInfo(userInfo))
      
    }
  }, [])
  return (
    <div className="App">
      
      
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* Admin Route */}
        <AdminLayout path="/admin">
          <Switch>
            <AdminAuth path="/admin/courses-management" component={CourseManagement} />
            <AdminAuth path="/admin/users-management" component={UserManagement}/>
            <AdminAuth path="/admin/list-user-course/:maKhoaHoc" component={ListUserCourse}/>
            <AdminAuth path="/admin/list-user-not-course/:maKhoaHoc" component={ListUserNotCourse}/>
            <AdminAuth path="/admin/list-user-wait-course/:maKhoaHoc" component={ListUserWaitCourse}/>
            <AdminAuth path="/admin/list-course-not-enroll/:taiKhoan" component={ListCourseNotEnroll}/>
            <AdminAuth path="/admin/user-detail/:taiKhoan" component={UserDetailAdmin}/>
            <AdminAuth path="/admin/list-course-enrolled/:taiKhoan" component={ListCourseEnrolled}/>
            <AdminAuth path="/admin/list-course-wait-enrolled/:taiKhoan" component={ListCourseWaitEnrolled}/>
          </Switch>
        </AdminLayout>

        {/* Nguoi Dung Route */}
        <UserLayout path="/">
          <Redirect to="/home" component={Home} />
          <Switch>
            <UserAuth path="/course-detail/:maKhoaHoc" component={CourseDetail} />
            <Route path="/home" component={Home} />
            <Route path="/course-list" component={CourseList} />
            <UserDetailLayout path="/account-info/:taiKhoan">
              <Switch>
                <Route path="/account-info/:taiKhoan/signup-courses" component={SignUpCourses} />
                <Route path="/account-info/:taiKhoan/my-courses" component={MyCourse}/>
                <Route path="/account-info/:taiKhoan/my-courses-waiting" component={MyCourseWaiting}/>
              </Switch>
            </UserDetailLayout>
          </Switch>
        </UserLayout>
      </Switch>
    </div>
  );
}

export default App;
