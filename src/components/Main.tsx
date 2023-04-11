import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const Main = () => {
  /*
  const location = useLocation();

  useEffect(() => {
    console.log("Current location is ", location);
  }, [location]);
  */
 
  return <Outlet />;
};
