
import React, { useEffect, useState } from "react";
import { Col, Row, } from '@themesberg/react-bootstrap';
import { CounterWidget, BarChartWidget } from "../../components/Widgets";
import { totalOrders } from "../../data/charts";
import { apiGetChart, apiGetTotalReport } from "../../services/dashboard";
import { SalesValueWidget } from "./SaleValueWiget";
import { formatPrice } from "../../utils";
import './style.scss'

export default () => {
    const [formFilter, setFormFilter] = useState({
        storeId: 1,
        startDate: "",
        endDate: ""
    })
    const [totalData, setTotalData] = useState({})
    const dateFormat = 'YYYY/MM/DD';
    const [rangeValue, setRangeValue] = useState([]);
    const [dataChart, setDataChart] = useState({})

    const handleRangeChange = (dates) => {
        setRangeValue(dates);
        setFormFilter({ ...formFilter, startDate: dates[0].format('YYYY-MM-DD'), endDate: dates[1].format('YYYY-MM-DD') })
    };

    const handleGetChartLine = async () => {

        try {
            const response = await apiGetChart(formFilter)
            if (response.status === 200) {
                setDataChart(response.data)
            }
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        if (formFilter.storeId) {
            handleGetChartLine()
        }
    }, [formFilter])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiGetTotalReport({ storeId: 1 })
                if (response.status === 200) {
                    setTotalData(response.data)
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData()
    }, [])
    return (
        <>
            <Row className="justify-content-md-center mt-4">
                <Col xs={12} sm={6} xl={3} className="mb-4">
                    <CounterWidget
                        category="Total Customers"
                        data={totalData?.total_guest}
                    />
                </Col>

                <Col xs={12} sm={6} xl={3} className="mb-4">
                    <CounterWidget
                        category="Total income"
                        data={formatPrice(totalData?.total_income)}
                    />
                </Col>

                <Col xs={12} sm={6} xl={3} className="mb-4">
                    <CounterWidget
                        category="Revenue"
                        data={formatPrice(totalData?.total_revenue)}
                    />
                </Col>
                <Col xs={12} sm={6} xl={3} className="mb-4">
                    <CounterWidget
                        category="Total orders"
                        data={totalData?.total_orders}
                    />
                </Col>

                <Col xs={12} className="mb-4 d-none d-sm-block">
                    <SalesValueWidget
                        title="Statistics"
                        value="10,567"
                        percentage={10.57}
                        dataChart={dataChart}
                        rangeValue={rangeValue}
                        dateFormat={dateFormat}
                        handleRangeChange={handleRangeChange}
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
