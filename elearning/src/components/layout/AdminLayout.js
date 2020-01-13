import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from 'react-router-dom'
const AdminLayout = (props) => {
    return (
        <div className="d-flex">
            <div style={{ width: '300px', height: '100vh' }}>
                <p>QUAN TRI HE THONG</p>
                <Nav vertical>
                <NavItem>
                        <NavLink><Link to="/home">Trang chu</Link></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink><Link to="/admin/users-management">Quan Ly Nguoi Dung </Link></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink><Link to="/admin/courses-management">Quan Ly Khoa Hoc</Link></NavLink>
                    </NavItem>
                   
                    <NavItem>
                        <NavLink disabled href="#">Disabled Link</NavLink>
                    </NavItem>
                </Nav>
            </div>
            <div>{props.children}</div>
        </div>
    )
}
export default AdminLayout
