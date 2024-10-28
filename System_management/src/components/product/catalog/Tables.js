import React, {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {Card, Form, Image, InputGroup, Table} from "@themesberg/react-bootstrap";
import {Link} from "react-router-dom";
import ImageLink from "../../../assets/img/no-image.png"
import {Routes} from "../../../routes";
import ModalDeleteItem from "../../../components/common/ModalDelete";
import {useHistory} from "react-router-dom";
import {formatTime, toastFailed, toastSuccess} from "../../../utils";
import {changeTextToThreeDot} from "../../../utils";
import {status} from "../../../enums";
import {apiDeleteCatalog, apiDetailCatalog, apiGetListCatalogs} from "../../../services/catalog";
import ListPagination from "../../common/ListPagination";
import {ToastContainer} from "react-toastify";
import { useMsal } from "@azure/msal-react";

export const CatalogTable = (props) => {
    const [catalogs, setCatalogs] = useState([])
    const [pageIndex, setPageIndex] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const modalDeleteCatalog = useRef(null);
    const [deleteCatalog, setDeleteCatalog] = useState(null);
    const history = useHistory();    
    const { instance, accounts } = useMsal();

    useEffect(() => {
        getListCatalogs();    
    }, [pageIndex])

    const getListCatalogs = async () => {
        try {
            const params = {
                PageIndex: pageIndex,
                PageSize: 10,
                parentId: '',
                token: accounts[0].idToken,
            }
            const response = await apiGetListCatalogs(params, accounts[0].idToken)
            if (response?.data.statusCode === status.SUCCESS)
                setCatalogs(flattenArray(response?.data?.data?.source))
            setTotalPages(response?.data?.data?.totalPages)
        } catch (e) {
        }
    }

    const flattenArray = (tree, level = 0) => {
        const flatArray = [];

        for (const item of tree) {
            flatArray.push(item);

            if (item.subCatalogs.length > 0) {
                flatArray.push(...flattenArray(item.subCatalogs));
            }
        }

        return flatArray;
    }
    const handleOpenModalDeleteCatalog = (id) => {
        setDeleteCatalog(id)
        modalDeleteCatalog.current.open();
    };

    const handleDeleteItem = async () => {
        try {
            const response = await apiDeleteCatalog(deleteCatalog, accounts[0].idToken);
            if (response?.data.statusCode === status.SUCCESS) {
                toastSuccess('Delete catalog successfully', '',)
                modalDeleteCatalog.current.close();
                setCatalogs(catalogs.filter(item => item.id !== deleteCatalog))
            } else if (response?.data.statusCode === status.ERROR_SUB) {
                modalDeleteCatalog.current.close();
                toastFailed(response.data.message)
            } else if (response?.data.statusCode === 404) {
                modalDeleteCatalog.current.close();
                toastFailed('This Catalog is not found')
            } else {
                modalDeleteCatalog.current.close();
                toastFailed('This catalog can not be deleted because of having products')
            }
        } catch (e) {
            toastFailed('Delete catalog failed')
        }      
    }
    const styleLevel = (level) => {
        return level === 0 ? 'fw-800' : ''
    }

    const handleClick = async (id) => {
        const response = await apiDetailCatalog(id, accounts[0].idToken)
        if (response?.data?.statusCode === 404) {
            toastFailed('This Catalog is not found')
        } else {
            history.push(`/product/update-catalog/${id}`)
        }       
    }

    const TableRow = (props) => {
        const {id, name, index, createdAt, level, imageUrl} = props;
        return (
            <tr>
                <td>
                    <Card.Link href="#" className="text-primary fw-bold">
                        {index + 1}
                    </Card.Link>
                </td>
                <td>
                    <Image src={props.imageUrl === "" ? ImageLink : `${process.env.REACT_APP_IMAGE_URL}${imageUrl}`}
                           className="product-thunmbnail me-2"/>
                </td>
                <td className={styleLevel(level)}>{level === 0 ? changeTextToThreeDot(name, 40) : (level === 1 ? '----- ' + changeTextToThreeDot(name, 40) : '---------- ' + changeTextToThreeDot(name, 40))}</td>
                <td>{formatTime(createdAt)}</td>
                <td>
                    <Link
                        to={Routes.NullLink.path}
                        className="text-primary fw-bold"
                    >
                        <FontAwesomeIcon
                            icon={faEdit}
                            className="me-2 fs-5"
                            onClick={() => handleClick(id)}
                        />
                    </Link>
                    <Link
                        to={Routes.NullLink.path}
                        className="text-primary fw-bold"
                    >
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="me-2 fs-5 text-danger"
                            onClick={() => handleOpenModalDeleteCatalog(id)}
                        />
                    </Link>
                </td>
            </tr>
        );
    };
    const handlePageChange = (newPage) => {
        if (newPage <= totalPages) {
            setPageIndex(newPage);
        }
    };

    return (
        <>
            <ToastContainer/>
            <Card border="light" className="shadow-sm mb-4">
                <Card.Body className="pb-0">
                    <Table
                        responsive
                        className="table-centered table-nowrap rounded mb-0"
                    >
                        <thead className="thead-light">
                        <tr>
                            <th className="border-0" style={{width: "5%"}}>#</th>
                            <th className="border-0" style={{width: "15%"}}>IMAGE</th>
                            <th className="border-0" style={{width: "40%"}}>NAME</th>
                            <th className="border-0" style={{width: "35%"}}>DATE CREATED</th>
                            <th className="border-0" style={{width: "5%"}}>ACTION</th>
                        </tr>
                        </thead>
                        <tbody>
                        {catalogs && catalogs.length > 0 ? catalogs.map((catalog, index) => (
                            <TableRow
                                index={index}
                                key={`page-traffic-${catalog.id}`}
                                {...catalog}
                            />
                        )) : <></>}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            {totalPages > 1 && (
                <ListPagination
                    page={pageIndex}
                    pageMax={totalPages}
                    onPageChange={handlePageChange}
                ></ListPagination>
            )}
            <ModalDeleteItem
                ref={modalDeleteCatalog}
                title={"Delete Catalog"}
                item={"catalog"}
                handleDeleteItem={handleDeleteItem}
            />
        </>
    );
};
