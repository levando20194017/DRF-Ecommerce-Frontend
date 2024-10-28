import React, {useEffect, useRef, useState} from "react";
import {Col, Row, Card, Form, Button, Image} from "@themesberg/react-bootstrap";
import {apiGetSetting} from "../../services/setting";
import {status} from "../../enums";

export const FormSetting = (props) => {
    const [pageIndex, setPageIndex] = useState(1)
    const [settings, setSettings] = useState()
    const [error, setError] = useState([])
    const {handleSubmitSetting} = props
    useEffect(() => {
        getSettings()
    }, []);
    const getSettings = async () => {
        try {
            const response = await apiGetSetting({
                PageIndex: pageIndex,
                PageSize: 3,
            })
            if (response?.data?.statusCode === status.SUCCESS) {
                setSettings(response?.data?.data?.source)
            }
        } catch (e) {

        }
    }
    const preventNegativeInput = () => {
        let input = document.getElementById('number_input')
        if (input) {
            input.onkeydown = function (e) {
                if (!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode === 8)) {
                    return false;
                }
            }
        }
    }
    const handleChangeInput = (e) => {
        preventNegativeInput()
        const {name, value} = e.target
        if (error.length > 0) {
            error.map(item => {
                if (item === name) {
                    let div = document.getElementById(name)
                    div.classList.add('hidden')
                }
            })
        }

        settings.map((item) => {
            if (item.settingKey === name) {
                item.settingVal = value
            }
        })
    }
    const handleValidate = () => {
        const newArr = []
        settings.map((item) => {
            if (item.settingVal === '') {
                newArr.push(item.settingKey)
            }
        })
        setError(newArr)
    }
    const handleSubmit = () => {
        handleValidate()
        handleSubmitSetting(settings)
    }
    useEffect(() => {
        if (error.length > 0) {
            error.map(item => {
                let div = document.getElementById(item)
                div.classList.remove('hidden')
            })
        }
    }, [error])
    const handleKeydown = (event) => {
        if (event.key === 'e') {
            event.preventDefault()
        }
        if (event.keyCode === 187 || event.keyCode === 189 || event.keyCode === 69) {
            event.preventDefault()
        }
    }
    return (
        <>
            <Col xs={12} xl={4}>
                <div className="d-flex justify-content-center align-items-center h-100">
                    <p className="display-5">Setting site information</p>
                </div>
            </Col>
            <Col xs={12} xl={8}>
                <Card border="light" className="bg-white shadow-sm mb-4">
                    <Card.Body>
                        <Form>
                            {
                                settings && settings.length > 0 ?
                                    settings.map((item, index) =>
                                        <Row key={index}>
                                            <Col md={12} className="mb-3">
                                                <Form.Group id="settingKey">
                                                    <Form.Label>{item?.settingKey}<span style={{paddingLeft: "2px"}}
                                                                                        className="text-danger">*</span></Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        required
                                                        name={item?.settingKey}
                                                        min={0}
                                                        defaultValue={item?.settingVal || ''}
                                                        onKeyDown={(e) => handleKeydown(e)}
                                                        onChange={(e) => handleChangeInput(e)}
                                                    />
                                                    {/*{error.length > 0 ? error.map(item => {*/}
                                                    {/*    if (Object.keys(item).toString() === item?.settingKey)*/}
                                                    {/*        return (*/}
                                                    {/*            <div*/}
                                                    {/*                className="text-danger">{item[item?.settingKey]}</div>*/}
                                                    {/*        )*/}

                                                    {/*}) : <></>}*/}
                                                    <div className="text-danger hidden"
                                                         id={item?.settingKey}>{item?.settingKey} is required
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    )
                                    : <></>
                            }

                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} xl={4}>
            </Col>
            <Col xs={12} xl={8}>
                <Button variant="primary" onClick={() => handleSubmit()}>
                    Save Setting
                </Button>
            </Col>
        </>
    );
};
