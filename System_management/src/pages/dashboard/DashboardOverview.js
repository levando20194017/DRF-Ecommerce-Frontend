
import React from "react";
import { Col, Row, } from '@themesberg/react-bootstrap';

import { CounterWidget, BarChartWidget, SalesValueWidget } from "../../components/Widgets";
import { totalOrders } from "../../data/charts";

export default () => {
    return (
        <>
            <Row className="justify-content-md-center mt-4">
                <Col xs={12} sm={6} xl={3} className="mb-4">
                    <CounterWidget
                        category="Total Customers"
                        data={"500"}
                    />
                </Col>

                <Col xs={12} sm={6} xl={3} className="mb-4">
                    <CounterWidget
                        category="Total income"
                        data={"333.500.000 VND"}
                    />
                </Col>

                <Col xs={12} sm={6} xl={3} className="mb-4">
                    <CounterWidget
                        category="Revenue"
                        data={"455.444.000 VND"}
                    />
                </Col>
                <Col xs={12} sm={6} xl={3} className="mb-4">
                    <CounterWidget
                        category="New orders"
                        data={"999"}
                    />
                </Col>

                <Col xs={12} className="mb-4 d-none d-sm-block">
                    <SalesValueWidget
                        title="Sales Value"
                        value="10,567"
                        percentage={10.57}
                    />
                </Col>
                {/* <Col xs={12} className="mb-4 d-sm-none">
                    <SalesValueWidgetPhone
                        title="Sales Value"
                        value="10,567"
                        percentage={10.57}
                    />
                </Col> */}

            </Row>

            <Row>
                <Col xs={12} xl={12} className="mb-4">
                    <Row>
                        <Col xs={12} xl={8} className="mb-4">
                            <Row>
                                <Col xs={12} className="mb-4">

                                </Col>
                            </Row>
                        </Col>

                        <Col xs={12} xl={4}>
                            <Row>
                                <Col xs={12} className="mb-4">
                                    <BarChartWidget
                                        title="Total orders"
                                        value={452}
                                        percentage={18.2}
                                        data={totalOrders} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};
