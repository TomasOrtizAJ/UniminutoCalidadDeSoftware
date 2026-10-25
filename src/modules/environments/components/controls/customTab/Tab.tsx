import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./Style/Custom-tab.scss";
import { useLocation, useNavigate } from "react-router-dom";

const tabRoutes = [
  { label: "Server", path: "/Environments/Server" },
  {
    label: "Activities",
    path: "/Environments/Activities",
  },
  {
    label: "Security Changes",
    path: "/Environments/Security-Changes",
  },
];

function DataTab() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTabIndex = tabRoutes.findIndex((tab) =>
    location.pathname.startsWith(tab.path)
  );
  const [value, setValue] = React.useState(
    currentTabIndex !== -1 ? currentTabIndex : 0
  );

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(tabRoutes[newValue].path);
  };

  return (
    <>
      <div className="custom-tab">
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
            {tabRoutes.map((tab) => (
              <Tab
                key={tab.path}
                label={tab.label}
              />
            ))}
          </Tabs>
        </Box>
      </div>
    </>
  );
}

export default DataTab;
