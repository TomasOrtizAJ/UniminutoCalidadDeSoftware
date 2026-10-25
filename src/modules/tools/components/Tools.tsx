import { Outlet } from "react-router-dom";
import Typography from "@mui/material/Typography";

function Tools() {
  return (
    <>
      <div className="container">
        <Typography variant="h1">Tools Page</Typography>
        <Outlet />
      </div>
    </>
  );
}
export default Tools;
