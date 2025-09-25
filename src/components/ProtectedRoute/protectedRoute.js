import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { token } from "../../utilities/authUtils";
import { profileCheckingApi } from "../../providers/userProvider";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../store/slices/userSlice";
import { registerUser } from "../../socket";
const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const checkProfileDetails = async () => {
    const response = await profileCheckingApi();
    if (response) {
      dispatch(setUserDetails(response?.data?.res));
      registerUser(response?.data?.res?._id);
    }
  };
  checkProfileDetails();

  return token === undefined ? <Navigate to="/login" /> : <Outlet />;
};
export default ProtectedRoute;
