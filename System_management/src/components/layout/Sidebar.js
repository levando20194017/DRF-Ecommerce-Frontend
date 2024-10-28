import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Collapse from "@kunukn/react-collapse";
import Down from "./Down";
import "./style.scss";

import {
  faCartPlus,
  faChartPie,
  faNewspaper,
  faShoppingBag,
  faTimes,
  faTools,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Badge,
  Image,
  Button,
  Dropdown,
  Navbar,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { Routes } from "../../routes";
import ReactHero from "../../assets/img/technologies/react-hero-logo.svg";
import ProfilePicture from "../../assets/img/team/profile-picture-3.jpg";
import { roles } from "../../enums/common";

const initialState = [false, false, false];
function reducer(state, { type, index }) {
  switch (type) {
    case "expand-all":
      return [true, true, true];
    case "collapse-all":
      return [false, false, false];
    case "toggle":
      let newState = [...state];
      newState[index] = !newState[index];
      return newState;

    default:
      throw new Error("reducer configuration");
  }
}
function Block({ isOpen, title, onToggle, children, icon }) {
  return (
    <div className="block">
      <div
        className={
          isOpen
            ? "toggle d-flex px-3 block_item open"
            : "toggle d-flex px-3 block_item"
        }
        onClick={onToggle}
      >
        <div>
          <FontAwesomeIcon icon={icon} />
          <span className="ms-3">{title}</span>
        </div>
        <div style={{ float: "right" }}>
          <Down isOpen={isOpen} />
        </div>
      </div>
      <Collapse isOpen={isOpen}>{children}</Collapse>
    </div>
  );
}

export default () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { accounts } = useMsal();

  const location = useLocation();
  const { pathname } = location;

  const isAdmin = accounts[0]?.idTokenClaims?.roles.includes(roles.ADMIN);
  const includeStaff = accounts[0]?.idTokenClaims?.roles.includes(roles.STAFF);
  const NavItem = (props) => {
    const {
      title,
      link,
      external,
      target,
      icon,
      image,
      badgeText,
      badgeBg = "secondary",
      badgeColor = "primary",
    } = props;
    const classNames = badgeText
      ? "d-flex justify-content-start align-items-center justify-content-between"
      : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? (
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
            ) : null}
            {image ? (
              <Image
                src={image}
                width={20}
                height={20}
                className="sidebar-icon svg-icon"
              />
            ) : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge
              pill
              bg={badgeBg}
              text={badgeColor}
              className="badge-md notification-count ms-2"
            >
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar
        expand={false}
        collapseOnSelect
        variant="dark"
        className="navbar-theme-primary px-4 d-md-none"
      >
        <Navbar.Brand
          className="me-lg-5"
          as={Link}
          to={Routes.DashboardOverview.path}
        >
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>

        <Navbar.Toggle as={Button} aria-controls="main-navbar">
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} classNames="sidebar-transition">
        <SimpleBar
          className={`collapse sidebar d-md-block bg-primary text-white`}
        >
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image
                    src={ProfilePicture}
                    className="card-img-top rounded-circle border-white"
                  />
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none">
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem title="Mint Admin" image={ReactHero} link="#" />
              <NavItem
                title="Dashboard"
                link={Routes.DashboardOverview.path}
                icon={faChartPie}
              />
              {isAdmin && (
                <Block
                  title="Products"
                  icon={faShoppingBag}
                  isOpen={state[0]}
                  onToggle={() => dispatch({ type: "toggle", index: 0 })}
                >
                  <div style={{ marginLeft: "33px" }}>
                    <NavItem
                      title="Create Product"
                      link={Routes.ProductCreate.path}
                    />
                    <NavItem title="List Product" link={Routes.Product.path} />
                    <NavItem title="Catalog" link={Routes.Catalog.path} />
                  </div>
                </Block>
              )}
              {isAdmin && (
                <Block
                  title="Order"
                  isOpen={state[1]}
                  icon={faCartPlus}
                  onToggle={() => dispatch({ type: "toggle", index: 1 })}
                >
                  <div style={{ marginLeft: "36px" }}>
                    <NavItem title="List Order" link={Routes.Order.path} />
                    <NavItem
                      title="Transaction Log"
                      link={Routes.Transaction.path}
                    />
                  </div>
                </Block>
              )}
              {isAdmin && (
                <NavItem
                  title="Contact"
                  link={Routes.Contact.path}
                  icon={faUser}
                />
              )}
              {includeStaff && (
                <Block
                  title="Blogs"
                  isOpen={state[2]}
                  icon={faNewspaper}
                  onToggle={() => dispatch({ type: "toggle", index: 2 })}
                >
                  <div style={{ marginLeft: "36px" }}>
                    <NavItem title="New blog" link={Routes.BlogCreate.path} />
                    <NavItem title="Blogs" link={Routes.Blog.path} />
                    <NavItem
                      title="Categories"
                      link={Routes.BlogCategory.path}
                    />
                    <NavItem title="Tags" link={Routes.BlogTag.path} />
                  </div>
                </Block>
              )}
              {isAdmin && (
                <NavItem
                  title="Setting"
                  icon={faTools}
                  link={Routes.Setting.path}
                />
              )}
              <Dropdown.Divider className="my-3 border-indigo" />
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
