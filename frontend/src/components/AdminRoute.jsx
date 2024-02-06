import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserInfoFromLocalStorage } from './Header';
const AdminRoute = () =>
{
  const userInfo = useSelector((state) => state.user);
  const getUserInfo = getUserInfoFromLocalStorage();
  return getUserInfo && getUserInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace />
  );
};
export default AdminRoute;
