import React from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import styles from '../../styles/Layout/header.module.scss'
import { useSelector } from 'react-redux'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const { userInfo } = useSelector(state => state.userReducer)
    const handleLogout = () => {
        localStorage.removeItem('userInfo')
        window.location.reload()
    }
    return (
        <div>
            <Navbar className={styles.myNavbar} light expand="md">
                <NavbarBrand href="/">
                    <img src="./img/logo.png" alt="" width={70} height={70} />
                    <span><span className={styles.myTextLogo}>E</span>-Learning</span>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem className={styles.myNavItem}>
                            <NavLink href="#" className={styles.myNavLink}>
                                <Link to="/home">Home</Link>
                            </NavLink>
                        </NavItem>
                        <NavItem className={styles.myNavItem}>
                            <NavLink href="#" className={styles.myNavLink}>
                                <Link to="/course-list">Courses</Link>
                            </NavLink>
                        </NavItem>
                        <NavItem className={styles.myNavItem}>
                            <NavLink href="#" className={styles.myNavLink}>
                                Blog
                            </NavLink>
                        </NavItem>
                        <NavItem className={styles.myNavItem}>
                            <NavLink href="#" className={styles.myNavLink}>
                                About
                            </NavLink>
                        </NavItem>
                        <NavItem className={styles.myNavItem}>
                            <NavLink href="#" className={styles.myNavLink}>
                                Contact
                            </NavLink>
                        </NavItem>
                        {Object.keys(userInfo).length !== 0 ? (
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <i className="fa fa-user"></i> Hello, {userInfo.taiKhoan}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>

                                        <Link to={'/account-info/' + userInfo.taiKhoan}>Account Detail</Link>

                                    </DropdownItem>
                                    {userInfo.maLoaiNguoiDung === 'GV' && (<DropdownItem>
                                        <Link to="/admin">Adminstration</Link>
                                    </DropdownItem>)}
                                    <DropdownItem divider />
                                    <DropdownItem onClick={handleLogout}>
                                        <Link to="/home">Log out</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        ) : (<div className="d-flex"><NavItem className={styles.myNavItem}>
                            <Link to="/login"><Button color="secondary" className={styles.myBtnLogin}>Log In</Button></Link>
                        </NavItem>
                            <NavItem className={styles.myNavItem}>
                                <Link to="/signup"><Button color="danger" className={styles.myBtnSignUp}>Sign Up</Button></Link>
                            </NavItem></div>)}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}
export default Header
