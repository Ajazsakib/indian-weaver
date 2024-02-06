// Header.jsx

import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import logo from '../assets/logo.png';
import { resetCart } from '../slices/cartSlice';
import { logoutUser } from '../slices/usersApiSlice';

export const getUserInfoFromLocalStorage = () =>
{
  const userInfoString = localStorage.getItem('userInfo');
  return userInfoString ? JSON.parse(userInfoString) : null;

};

const Header = () =>
{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user);
  const getUserInfo = getUserInfoFromLocalStorage();
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  let numOfCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).cartItems.length : 0



  const logoutHandler = async () =>
  {
    try {
      dispatch(logoutUser());
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar className='menu-bar' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} alt='ProShop' />
              IW
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto custom-menu'>
              {/* Other menu items */}
              <LinkContainer to='/login'>
                <NavDropdown.Item>HOME</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/login'>
                <NavDropdown.Item>ABOUT US</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/login'>
                <NavDropdown.Item>PORTFOLIO</NavDropdown.Item>
              </LinkContainer>
              {isLoggedIn && (
                <LinkContainer to='/cart'>
                  <Nav.Link>
                    CART({numOfCart})
                  </Nav.Link>
                </LinkContainer>
              )}

              {
                isLoggedIn ? (
                  <>
                    <NavDropdown title={getUserInfo?.name} id='username'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <LinkContainer to='/login'>
                    <NavDropdown.Item>Sign In</NavDropdown.Item>
                  </LinkContainer>
                )}

              {/* Admin Links */}
              {isLoggedIn && getUserInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header >
  );
};

export default Header;
