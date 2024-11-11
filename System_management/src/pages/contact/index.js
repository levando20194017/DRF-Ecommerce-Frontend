
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from '@themesberg/react-bootstrap';

import { ContactTable } from "../../components/contact/Tables";

export default () => {
    return (
        <>
            <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2">
                <div className="d-block mb-4 mb-xl-0">
                    <Breadcrumb listProps={{ className: "breadcrumb-primary    breadcrumb-text-light text-white" }}>
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item>Contact</Breadcrumb.Item>
                        <Breadcrumb.Item active>Contact list</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>Contact list</h4>
                </div>
            </div>

            <ContactTable />
        </>
    );
};
