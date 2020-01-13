import React from 'react'
import UserDetail from '../pages/UserDetail'

const UserDetailLayout = (props) => {
    return (
        <React.Fragment>
            <div className="row mr-0">
                <div className="col-4"><UserDetail/></div>
                <div className="col-8">{props.children}</div>
            </div>
        </React.Fragment>
    )
}
export default UserDetailLayout