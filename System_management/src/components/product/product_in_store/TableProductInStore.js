import React from "react";
import { Card, Table, Image } from "@themesberg/react-bootstrap";
import { formatTime } from "../../../utils";
import { changeTextToThreeDot } from "../../../utils";
import { ToastContainer } from "react-toastify";
import ImageLink from "../../../assets/img/no-image.png";

export default ({
    pageIndex,
    pageSize,
    listData,
}) => {

    const TableRow = (props) => {
        const { index, product_image, product_name, total_views, quantity_in, remaining_stock, store_name, store_address } = props;
        return (
            <tr>
                <td>
                    <Card.Link href="#" className="text-primary fw-bold">
                        {index + (pageIndex - 1) * pageSize + 1}
                    </Card.Link>
                </td>
                <td>
                    <Image src={!product_image ? ImageLink : `${process.env.REACT_APP_IMAGE_URL}${product_image}`}
                        className="product-thumbnail me-2" />
                </td>
                <td>
                    {changeTextToThreeDot(product_name, 20)}
                </td>
                <td className="text-danger">
                    {quantity_in}
                </td>
                <td className="text-danger">{remaining_stock}</td>
                <td className="text-danger">{total_views}</td>
                <td>{store_name}</td>
                <td>{store_address}</td>
            </tr>
        );
    };

    return (
        <>
            <ToastContainer />
            <Card border="light" className="shadow-sm mb-4">
                <Card.Body className="">
                    <Table
                        responsive
                        className="table-centered table-nowrap rounded mb-0"
                    >
                        <thead className="thead-light">
                            <tr>
                                <th className="border-0" style={{ width: "3%" }}>#</th>
                                <th className="border-0">IMAGE</th>
                                <th className="border-0">NAME</th>
                                <th className="border-0">QUANTITY IN</th>
                                <th className="border-0">REMAINING STOCK</th>
                                <th className="border-0">VIEWS</th>
                                <th className="border-0">STORE</th>
                                <th className="border-0">ADDRESS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listData && listData.length > 0 ? listData.map((product, index) => (
                                <TableRow
                                    index={index}
                                    key={`page-traffic-${product.id}`}
                                    {...product}
                                />
                            )) : <></>}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    );
};
