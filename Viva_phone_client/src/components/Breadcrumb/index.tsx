import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { MdNavigateNext } from "react-icons/md";

interface BreadcrumbProps {
  breadcrumbs: { label: string; path?: string }[]; // Định nghĩa kiểu dữ liệu cho breadcrumbs
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbs }) => {
  return (
    <nav className="breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={index} className="breadcrumb-item">
          {breadcrumb.path && index !== breadcrumbs.length - 1 ? (
            <Link to={breadcrumb.path}>{breadcrumb.label}</Link>
          ) : (
            <span>{breadcrumb.label}</span>
          )}
          {index !== breadcrumbs.length - 1 && (
            <span className="breadcrumb-separator"><MdNavigateNext /></span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
