import { Home } from "@mui/icons-material";
import { Route } from "../types/Route";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import Environments from "../modules/environments/pages/Environments";
const routes: Array<Route> = [
  {
    key: "router-home",
    title: "Home",
    description: "Home",
    component: Home,
    path: "/",
    isEnabled: true,
    icon: HouseOutlinedIcon,
    appendDivider: true,
    hiddenInSideMenu: true,
  },
  {
    key: "router-Environments",
    title: "Environments",
    description: "Environments",
    component: Environments,
    path: "/Environments",
    isEnabled: true,
    icon: NewspaperOutlinedIcon,
    appendDivider: true,
    hiddenInSideMenu: true,
  },

  // {
  //   key: "router-NewICUPatientSearch",
  //   title: "Add New ICU Patient",
  //   description: "ICU Patient Search",
  //   component: SearchPatient,
  //   path: "/ICU/PatientSearch",
  //   isEnabled: true,
  //   icon: PersonSearchOutlinedIcon,
  //   appendDivider: true,
  //   hiddenInSideMenu: false
  // },
];

export default routes;
