import React from 'react'
import Header from '../UI/Header'
import Footer from '../UI/Footer'


const UserLayout = (props) => {
    
    return (
        <React.Fragment>
            <Header/>
            {props.children}
            <Footer/>
        </React.Fragment>
    )
}
export default UserLayout
