import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { logout } from './slices/authSlice';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderWraper from './components/HeaderWraper';
import HeaderContainer from './components/HeaderContainer';
const App = () =>
{
  const dispatch = useDispatch();

  useEffect(() =>
  {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, [dispatch]);
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <ToastContainer />



      <HeaderContainer>
        <HeaderWraper /><Header />
      </HeaderContainer>
      <main>

        <Outlet />

      </main>
      <Footer />
    </>
  );
};

export default App;
