import React from 'react'
import Swal from 'sweetalert2'
import { Route, Redirect } from 'react-router-dom'
const UserAuth = ({ component: Component, ...props }) => {
    return (
        <Route {...props} 
        render={routerProps => {
            //Xu ly kiem tra xem user da dang nhap hay chua
            const userInfo = JSON.parse(localStorage.getItem("userInfo"))
            if(userInfo) {
                return <Component {...routerProps}/> //render phai gan routerProps de co history, match, location vi render khong co san
            }
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Please login',
                showConfirmButton: true,
            })
            return <Redirect to="/login"/>
        }} />
    )
}
export default UserAuth