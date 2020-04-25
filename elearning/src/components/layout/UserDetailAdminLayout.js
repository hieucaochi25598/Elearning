import React from 'react'
import UserDetailAdmin from '../pages/UserDetailAdmin'

const UserDetailAdminLayout = (props) => {
    return (
        <div>
            <UserDetailAdmin/>
            <div>{props.children}</div>
        </div>
    )
}
export default UserDetailAdminLayout
