import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../modules/environments/utils/Constants";
import { useAuth } from "../../../context/AuthProvider";
import "./style/App-tittle.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const API_URL = BASE_URL;
function NavBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();
  const auth = useAuth();
  const settings = [
    { name: "Profile", path: "/Profile" },
    { name: "Login", path: "/Login" },
    { name: "Logout", path: "/Logout" },
  ];
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleMenuItemClick = async (path: string) => {
    if (path === "/Logout") {
      await handleSignOut();
    } else {
      navigate(path);
    }
    handleCloseUserMenu();
  };
  async function handleSignOut() {
    try {
      const response = await fetch(`${API_URL}Authentication/Logout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`,
        },
      });
      if (response.ok) {
        auth.signOut();
        navigate("/");
        console.log("Response JSON: Successful Logout");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar disableGutters>
        <div className="header">
          <div className="brand-logo">
            {/* Logo Section */}
            <Box
              component="img"
              src={Logo}
              alt="Logo"
            />
          </div>
          <div className="title">
            <div className="title-inner">
              {/* Title Section */}
              <Typography variant="h6">
                TAM - Traffic Applications Management
              </Typography>
            </div>
          </div>
          <div className="header-right-box">
            {/* Right Section */}
            <Box>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                >
                  <Avatar alt="User">
                    <AccountCircleIcon />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={() => handleMenuItemClick(setting.path)}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default NavBar;
