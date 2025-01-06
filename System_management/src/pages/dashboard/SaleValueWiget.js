
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Image, Button, ListGroup, ProgressBar } from '@themesberg/react-bootstrap';
import { LineChart } from "./LineChart";
import { DatePicker } from "antd";
import { formatPrice } from "../../utils";


export const SalesValueWidget = (props) => {
    const { title, value, percentage, dataChart, rangeValue, dateFormat, handleRangeChange } = props;
    const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
    const percentageColor = percentage < 0 ? "text-danger" : "text-success";
    const { RangePicker } = DatePicker;
    const [statistics, setStatistics] = useState({
        totalIncomePrice: 0,
        totalSalePrice: 0,
        totalQuantityIn: 0,
        totalQuantityOut: 0
    })

    useEffect(() => {
        if (dataChart?.labels?.length > 0) {
            const totalIncomePrice = dataChart.series[2].data.reduce((total, incom) => {
                return total + incom
            }, 0)
            const totalSalePrice = dataChart.series[0].data.reduce((total, incom) => {
                return total + incom
            }, 0)
            const totalQuantityIn = dataChart.series[3].data.reduce((total, incom) => {
                return total + incom
            }, 0)
            const totalQuantityOut = dataChart.series[1].data.reduce((total, incom) => {
                return total + incom
            }, 0)

            setStatistics({ totalIncomePrice, totalSalePrice, totalQuantityIn, totalQuantityOut })
        }
    }, [dataChart])

    return (
        <Card className="bg-secondary-alt shadow-sm">
            <Card.Header className="d-flex flex-row align-items-center flex-0">
                <div className="d-block">
                    <div className="d-flex gap-3">
                        <h5 className="fw-bold mb-2">
                            {title}
                        </h5>
                        <div>(Default 1 month with data)</div>
                    </div>
                    <div className="d-flex gap-4">
                        <div>Total icome: {formatPrice(statistics.totalIncomePrice)}</div>
                        <div>Quantity in: {statistics.totalQuantityIn}</div>
                    </div>
                    <div className="d-flex gap-4">
                        <div>Revenue: {formatPrice(statistics.totalSalePrice)}</div>
                        <div>Quantity sold: {statistics.totalQuantityOut}</div>
                    </div>
                    {/* <small className="fw-bold mt-2">
                        <span className="me-2">Yesterday</span>
                        <FontAwesomeIcon icon={percentageIcon} className={`${percentageColor} me-1`} />
                        <span className={percentageColor}>
                            {percentage}%
                        </span>
                    </small> */}
                </div>
                <div className="d-flex ms-auto">
                    <Col xs={12}>
                        <RangePicker
                            value={rangeValue}
                            format={dateFormat}
                            onChange={handleRangeChange}
                        />
                    </Col>
                </div>
            </Card.Header>
            <Card.Body className="p-2">
                <LineChart dataChart={dataChart} />
            </Card.Body>
        </Card>
    );
};