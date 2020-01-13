import React from 'react'
import Header from '../UI/Header'


const UserLayout = (props) => {
    return (
        <React.Fragment>
            <Header/>
            {props.children}
        </React.Fragment>
    )
}
export default UserLayout
