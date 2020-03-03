import React from 'react'
import UserDetail from '../pages/UserDetail'
import styles from '../../styles/Layout/userdetail.module.scss'
const UserDetailLayout = (props) => {
    return (
        <React.Fragment>
            <div className={`row mr-0 p-4 ${styles.userDetailContainer}`}>
                <div className="col-4"><UserDetail/></div>
                <div className="col-8">{props.children}</div>
            </div>
        </React.Fragment>
    )
}
export default UserDetailLayout