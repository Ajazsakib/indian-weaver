import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
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
const Header = () =>
{
  const { cartItems } = useSelector((state) => state.cart);
  const userInfo = useSelector((state) => state.user);
  const getUserInfo = JSON.parse(localStorage.getItem("userInfo"))
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  console.log(userInfo)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () =>
  {
    try {
      // await logoutApiCall().unwrap();
      dispatch(logoutUser());
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      // dispatch(resetCart());
      // navigate('/login');
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
              {/* <SearchBox /> */}
              <LinkContainer to='/profile'>
                <NavDropdown.Item>HOME</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>ABOUT US</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>SHOP</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>PRODUCTS</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>PORTFOLIO</NavDropdown.Item>
              </LinkContainer>
              {
                isLoggedIn && <LinkContainer to='/cart'>
                  <Nav.Link>
                    CART(0)

                  </Nav.Link>
                </LinkContainer>
              }

              {isLoggedIn ? (
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
              {isLoggedIn && userInfo.isAdmin && (
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
    </header>
  );
};

export default Header;
