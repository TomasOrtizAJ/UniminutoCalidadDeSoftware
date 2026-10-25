import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/customLayout/Layout.tsx";
import { routes } from "./config";
import { Route as AppRoute } from "./types";
import Login from "./context/components/login/Login";
import Home from "./modules/home/components/home.tsx";
import Profile from "./modules/profile/components/Profile.tsx";
import Activities from "./modules/environments/activities/components/Activities.tsx";
import Server from "./modules/environments/server/components/Server.tsx";
import SecChanges from "./modules/environments/securityChanges/components/SecChanges.tsx";
import Environments from "./modules/environments/pages/Environments.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import ProtectedRoute from "./context/ProtectedRoute.tsx";

export const Router: FC = () => {
  const addSubRoute = (subRoutes?: AppRoute[]) => {
    return subRoutes?.map((sRoute) => (
      <Route
        key={sRoute.key}
        path={sRoute.path}
        element={sRoute.component ? <sRoute.component /> : null}
      />
    ));
  };

  const addRoute = (route: AppRoute) => {
    if (route.nonAuthorized) {
      return (
        <>
          <Route
            key={route.key}
            path={route.path}
            element={route.component ? <route.component /> : null}
          />
          {addSubRoute(route.subRoutes)}
        </>
      );
    }

    return (
      <Route
        key={route.key}
        path={route.path}
        element={route.component ? <route.component /> : null}
      >
        {addSubRoute(route.subRoutes)}
      </Route>
    );
  };

  const displayRoutes = (listRoutes: AppRoute[]) => {
    return listRoutes.map((route) => addRoute(route));
  };

  return (

    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/Login"
          element={<Login />}
        />

        {/* Protected Routes */}
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/Profile"
            element={<Profile />}
          />

          {displayRoutes(routes)}
          <Route
            path="/Environments"
            element={<Environments />}
          >
            <Route
              index
              element={
                <Navigate
                  to="Server"
                  replace
                />
              }
            />
            <Route
              path="Activities"
              element={<Activities />}
            />
            <Route
              path="Server"
              element={<Server />}
            />
            <Route
              path="Security-Changes"
              element={<SecChanges />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
