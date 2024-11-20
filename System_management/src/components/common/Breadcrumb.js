import { Breadcrumb } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default (props) => {
    const { breadcrumbs } = props
    return (
        <Breadcrumb listProps={{ className: "breadcrumb-primary    breadcrumb-text-light text-white" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            {
                breadcrumbs.map((item, index) => {
                    return (
                        <>
                            <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                        </>
                    )
                })
            }
        </Breadcrumb>
    );
}