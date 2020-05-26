import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from 'react-router-dom'
const AdminLayout = (props) => {
    return (
        <div className="row mr-0 position-relative">
            <div style={{width: "230px"}}>
            <div className="col-2 bg-dark position-fixed" style={{height:"100vh"}}>
                <h2 className="text-white text-center mt-3">DASHBOARD</h2>
                <Nav vertical>
                    <NavItem>
                        <NavLink tag={Link} to="/admin/users-management">Quản Lý Người Dùng</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/admin/courses-management">Quản Lý Khóa Học</NavLink>
                    </NavItem>
                </Nav>
            </div>
            </div>
            <div className="col-10 pl-5">{props.children}</div>
        </div>
    )
}
export default AdminLayout
