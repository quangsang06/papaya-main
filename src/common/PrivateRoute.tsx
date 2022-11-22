import { Navigate } from "react-router-dom";
import { getAccessToken } from "services/storage";
interface IRouteProps {
  children: React.ReactElement;
}
export function PrivateRoute({ children }: IRouteProps) {
  const isLoggedIn = Boolean(getAccessToken());
  return isLoggedIn ? children : <Navigate to="/sign-in" />;
}
