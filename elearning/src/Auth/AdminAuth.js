import React from 'react'
import { Route, Redirect } from 'react-router-dom'
const AdminAuth = ({ component: Component, ...props }) => {
    return (
        <Route {...props}
            render={routerProps => {
                //Xu ly kiem tra xem user da dang nhap hay chua
                const userInfo = JSON.parse(localStorage.getItem("userInfo"))
                if (userInfo) {
                    if (userInfo.maLoaiNguoiDung === 'GV') {
                        return <Component {...routerProps} />
                    }
                    return <Redirect to="/" /> //render phai gan routerProps de co history, match, location vi render khong co san
                }
                return <Redirect to="/login" />
            }} />
    )
}
export default AdminAuth
