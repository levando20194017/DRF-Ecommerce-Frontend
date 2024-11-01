import React, {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faPlus} from "@fortawesome/free-solid-svg-icons";

import {CatalogTable} from "../../../components/product/catalog/Tables";
import Button from "../../../components/common/Button";
import {Breadcrumb} from "@themesberg/react-bootstrap";
import {useHistory} from "react-router-dom";

export default () => {
    const history = useHistory();

    return (
        <>
            <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block w-100 mb-4 mb-xl-0">
                    <Breadcrumb
                        className="d-none d-md-inline-block"
                        listProps={{
                            className: "breadcrumb-dark breadcrumb-transparent",
                        }}
                    >
                        <Breadcrumb.Item>
                            <FontAwesomeIcon icon={faHome}/>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item
                            onClick={() => history.push("/product")}
                        >
                            Product
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            Catalog management
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <h4 className="mb-0">Catalog management</h4>
                        <Button
                            icon={faPlus}
                            className="background-primary"
                            variant="secondary"
                            onClick={() =>
                                history.push("/product/create-catalog")
                            }
                        >
                            Create Catalog
                        </Button>
                    </div>
                </div>
            </div>

            <CatalogTable />
        </>
    );
};
