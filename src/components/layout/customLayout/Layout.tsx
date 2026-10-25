import { FC } from "react";
import "./style/Layout.scss";
import { Outlet } from "react-router-dom";
import NavBar from "../customNavBar/Nav-Bar";
import SideBar from "../customSideBar/Side-Bar";

export const Layout: FC = () => {
  return (
    <>
      <div className="layout-container">
        <NavBar />
        <SideBar />
        <div className="content-container">
          <Outlet />
        </div>
      </div>
    </>
  );
};
