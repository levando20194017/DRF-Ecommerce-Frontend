import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages
import DashboardOverview from "./dashboard/DashboardOverview";
import Product from "./product/index";
import ProductCreate from "./product/create";
import Catalog from "./product/catalog/index";
import CatalogCreate from "./product/catalog/create";
import Login from "./auth/login";
import Register from "./auth/register";
import Contact from "./contact";
import Blog from "./blog";
import BlogCreate from "./blog/create";
import BlogTag from "./blog/tag/index";
import BlogCategory from "./blog/category/index";
import BlogCategoryCreate from "./blog/category/create";
import Transaction from "./product/order/transaction/index";
import TransactionDetail from "./product/order/transaction/detail/index";
import ListOrder from "./order";
import Setting from "./setting";
import NotFound from "./notFound/NotFound";
// components
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Preloader from "../components/layout/Preloader";
import { useMsal } from "@azure/msal-react";
import { roles } from "../enums";
import InvalidPermission from "./invalidPermission/InvalidPermission";

const PublicRouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {" "}
          <Preloader show={!loaded} /> <Component {...props} />{" "}
        </>
      )}
    />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") !== "false";
  };

  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };
  const { accounts } = useMsal();
  let isAdmin = false;
  let isExistRole = false;
  if (accounts[0]?.idTokenClaims?.roles?.length > 0) {
    isAdmin = accounts[0]?.idTokenClaims?.roles?.includes(roles.ADMIN);
    isExistRole = true;
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isExistRole === true) {
          if (isAdmin === true) {
            return (
              <>
                <Sidebar />

                <main className="content">
                  <Navbar />
                  <div style={{ padding: "0 1rem 0 1rem" }}>
                    <Component {...props} />
                    <Footer
                      toggleSettings={toggleSettings}
                      showSettings={showSettings}
                    />
                  </div>
                </main>
              </>
            );
          } else {
            return <Redirect to={Routes.NotFound.path} />;
          }
        } else {
          return <Redirect to={Routes.InvalidPermission.path} />;
        }
      }}
    />
  );
};

const RouteWithSidebarStaff = ({ component: Component, ...rest }) => {
  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") !== "false";
  };

  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };
  const { accounts } = useMsal();
  let includeStaff = false;
  let isExistRole = false;
  if (accounts[0]?.idTokenClaims?.roles?.length > 0) {
    includeStaff = accounts[0]?.idTokenClaims?.roles.includes(roles.STAFF);
    isExistRole = true;
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isExistRole === true) {
          if (includeStaff === true) {
            return (
              <>
                <Sidebar />

                <main className="content">
                  <Navbar />
                  <div style={{ padding: "0 1rem 0 1rem" }}>
                    <Component {...props} />
                    <Footer
                      toggleSettings={toggleSettings}
                      showSettings={showSettings}
                    />
                  </div>
                </main>
              </>
            );
          } else {
            return <Redirect to={Routes.NotFound.path} />;
          }
        } else {
          return <Redirect to={Routes.InvalidPermission.path} />;
        }
      }}
    />
  );
};

export default () => (
  <Switch>
    <PublicRouteWithLoader
      exact
      path={Routes.NotFound.path}
      component={NotFound}
    />
    <PublicRouteWithLoader
      exact
      path={Routes.InvalidPermission.path}
      component={InvalidPermission}
    />

    <RouteWithSidebarStaff
      exact
      path={Routes.DashboardOverview.path}
      component={DashboardOverview}
    />
    <RouteWithSidebar exact path={Routes.Product.path} component={Product} />
    <RouteWithSidebar exact path={Routes.Catalog.path} component={Catalog} />
    <RouteWithSidebar
      exact
      path={Routes.CatalogCreate.path}
      component={CatalogCreate}
    />
    <RouteWithSidebar
      exact
      path={Routes.CatalogUpdate.path}
      component={CatalogCreate}
    />
    <RouteWithSidebarStaff exact path={Routes.Blog.path} component={Blog} />
    <RouteWithSidebarStaff
      exact
      path={Routes.BlogCreate.path}
      component={BlogCreate}
    />
    <RouteWithSidebarStaff
      exact
      path={Routes.BlogUpdate.path}
      component={BlogCreate}
    />
    <RouteWithSidebarStaff
      exact
      path={Routes.BlogCategoryCreate.path}
      component={BlogCategoryCreate}
    />
    <RouteWithSidebarStaff
      exact
      path={Routes.BlogCategoryUpdate.path}
      component={BlogCategoryCreate}
    />
    <RouteWithSidebarStaff
      exact
      path={Routes.BlogCategory.path}
      component={BlogCategory}
    />
    <RouteWithSidebar exact path={Routes.Order.path} component={ListOrder} />
    <RouteWithSidebarStaff
      exact
      path={Routes.BlogTag.path}
      component={BlogTag}
    />
    <RouteWithSidebar
      exact
      path={Routes.ProductCreate.path}
      component={ProductCreate}
    />
    <RouteWithSidebar
      exact
      path={Routes.ProductEdit.path}
      component={ProductCreate}
    />
    <PublicRouteWithLoader exact path={Routes.Login.path} component={Login} />
    <PublicRouteWithLoader
      exact
      path={Routes.Register.path}
      component={Register}
    />
    <RouteWithSidebar exact path={Routes.Contact.path} component={Contact} />
    <RouteWithSidebar
      exact
      path={Routes.Transaction.path}
      component={Transaction}
    />
    <RouteWithSidebar
      exact
      path={Routes.TransactionDetail.path}
      component={TransactionDetail}
    />
    <RouteWithSidebar exact path={Routes.Setting.path} component={Setting} />
    <Redirect to={Routes.NotFound.path} />
    <Redirect to={Routes.InvalidPermission.path} />
  </Switch>
);
