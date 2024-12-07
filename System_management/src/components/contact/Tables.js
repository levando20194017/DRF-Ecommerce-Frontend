import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, Table } from "@themesberg/react-bootstrap";
import { changeTextToThreeDot, formatFullTime, formatTime, toastFailed } from "../../utils";
import { apiDeleteContact, apiUpdateStatusAdvised } from "../../services/contact";
import { Checkbox, Popconfirm } from "antd";

export const ContactTable = (props) => {
    const { listData, getListData, pageIndex, pageSize } = props

    const handleDeleteData = async (id) => {
        try {
            const response = await apiDeleteContact(id)
            if (response.status === 200) {
                getListData()
            } else {
                toastFailed(response.message)
            }
        } catch (e) {
            toastFailed('Delete Contact Failed')
        }
    }

    const handleOnChangeStatusContact = async (checked, id) => {
        try {
            const response = await apiUpdateStatusAdvised([{ id, is_advised: checked }]);

            if (response.status === 200) {
                // Gọi lại API lấy danh sách để đồng bộ dữ liệu
                getListData();
            } else {
                toastFailed(response.message || "Failed to update contact status");
            }
        } catch (error) {
            console.error(error);
            toastFailed("Error updating contact status");
        }
    };

    const TableRow = (props) => {
        const { id, index, full_name, email, phone_number, question, is_advised, created_at } = props;

        return (
            <tr>
                <td>
                    <Card.Link href="#" className="text-primary fw-bold">
                        {index + (pageIndex - 1) * pageSize + 1}
                    </Card.Link>
                </td>
                <td>{full_name}</td>
                <td>{email ? email : "--"}</td>
                <td>{phone_number ? phone_number : "--"}</td>
                <td>{question ? changeTextToThreeDot(question, 50) : "--"}</td>
                <td>
                    <Checkbox
                        checked={is_advised}
                        onChange={(e) => handleOnChangeStatusContact(e.target.checked, id)}
                    />
                </td>
                <td>{formatFullTime(created_at)}</td>
                <td>
                    <Popconfirm
                        title="Are you sure you want to delete this item?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDeleteData(id)}
                        className="cursor-pointer"
                    >
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="me-2 fs-5 text-danger"
                        />
                    </Popconfirm>
                </td>
            </tr>
        );
    };

    return (
        <Card border="light" className="shadow-sm mb-4">
            <Card.Body className="">
                <Table
                    responsive
                    className="table-centered table-nowrap rounded mb-0"
                >
                    <thead className="thead-light">
                        <tr>
                            <th className="border-0">#</th>
                            <th className="border-0">FULL NAME</th>
                            <th className="border-0">EMAIL</th>
                            <th className="border-0">PHONE</th>
                            <th className="border-0">CONTENT</th>
                            <th className="border-0">IS ADVISED</th>
                            <th className="border-0">DATE CREATED</th>
                            <th className="border-0">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listData.map((contact, index) => (
                            <TableRow
                                index={index}
                                key={`page-traffic-${contact.id}`}
                                {...contact}
                            />
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};
