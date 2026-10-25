import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { routes } from "../../../config";
import { Route } from "../../../types";
import "./style/Side-Bar.scss";
import { Link } from "react-router-dom";

type Anchor = "top" | "left" | "bottom" | "right";
export default function SideBar() {
  const [state, setState] = React.useState({
    left: true,
  });
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderRoute = (route: any): JSX.Element => (
    <div>
      <Link
        key={route.key}
        to={route.path}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ListItem
          key={route.key}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>{route.icon && <route.icon />}</ListItemIcon>
            <ListItemText primary={route.title} />
          </ListItemButton>
        </ListItem>
      </Link>
      {route.subRoutes && (
        <List sx={{ pl: 4 }}>
          {route.subRoutes.map((subRoute: Route) => (
            <Link
              key={subRoute.key}
              to={subRoute.path}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem
                key={subRoute.key}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    {subRoute.icon && <subRoute.icon />}
                  </ListItemIcon>
                  <ListItemText primary={subRoute.title} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      )}
    </div>
  );
  const list = (anchor: Anchor): JSX.Element => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className="listContainer">
        {routes
          .filter((route) => route.isEnabled) // Only include enabled routes
          .map((route) => (
            <React.Fragment key={route.key}>
              {renderRoute(route)}
              {route.appendDivider && <Divider />}
            </React.Fragment>
          ))}
      </List>
    </Box>
  );
  return (
    <div>
      {/* Button to toggle the sidebar */}
      <Button
        onClick={toggleDrawer("left", !state.left)}
        sx={{
          position: "fixed",
          top: "50%",
          left: state.left ? 250 : 0, // Adjust position based on sidebar state
          transform: "translateY(-50%)",
          zIndex: 1300, // Ensure it stays above the drawer
          minWidth: "auto",
        }}
      >
        {state.left ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
      </Button>

      <React.Fragment key={"left"}>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
