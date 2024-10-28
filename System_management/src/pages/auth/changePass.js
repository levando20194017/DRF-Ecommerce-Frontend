import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUnlockAlt} from "@fortawesome/free-solid-svg-icons";
import {Col, Form, Button, Container, InputGroup} from '@themesberg/react-bootstrap';

export default () => {

    return (
        <main>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <Col xs={12} className="d-flex align-items-center justify-content-center">
                        <div
                            className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                            <Form className="mt-4">

                                <Form.Group id="oldPassword" className="mb-4">
                                    <Form.Label>Old Password</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faUnlockAlt}/>
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            type="password"
                                            placeholder="Old Password"

                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group id="newPassword" className="mb-4">
                                    <Form.Label>New Password</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faUnlockAlt}/>
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            type="password"
                                            placeholder="New Password"
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group id="confirmPassword" className="mb-4">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faUnlockAlt}/>
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            type="password"
                                            placeholder="Confirm Password"
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Container>
            </section>
        </main>
    );
};
