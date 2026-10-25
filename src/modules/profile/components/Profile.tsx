import { Outlet } from "react-router-dom";
import Typography from "@mui/material/Typography";

function Profile() {
  return (
    <>
      <div className="container">
        <Typography variant="h1">Profile Page</Typography>
        <Outlet />
      </div>
    </>
  );
}
export default Profile;
