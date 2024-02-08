import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserInfoFromLocalStorage } from './Header';
const AdminRoute = () =>
{
  const getUserInfo = getUserInfoFromLocalStorage();
  return getUserInfo && getUserInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace />
  );
};
export default AdminRoute;
