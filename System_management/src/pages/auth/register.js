import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faEnvelope,
    faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
    Col,
    Row,
    Form,
    Card,
    Button,
    Container,
    InputGroup,
} from "@themesberg/react-bootstrap";
import {Link} from "react-router-dom";
import {Routes} from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";

const Register = () => {
    return (
        <main>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <p className="text-center">
                        <Card.Link
                            as={Link}
                            to={Routes.DashboardOverview.path}
                            className="text-gray-700"
                        >
                            <FontAwesomeIcon icon={faAngleLeft} className="me-2"/> Back to
                            homepage
                        </Card.Link>
                    </p>
                    <Row
                        className="justify-content-center form-bg-image"
                        style={{backgroundImage: `url(${BgImage})`}}
                    >
                        <Col
                            xs={12}
                            className="d-flex align-items-center justify-content-center"
                        >
                            <div
                                className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                    <h3 className="mb-0">Create an account</h3>
                                </div>
                                <Form className="mt-4">
                                    <Form.Group id="username" className="mb-4">
                                        <Form.Label>Your Username</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUnlockAlt}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                type="username"
                                                name="username"

                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group id="email" className="mb-4">
                                        <Form.Label>Your Email</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faEnvelope}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                autoFocus
                                                required
                                                type="email"
                                                placeholder="example@company.com"
                                                name="email"

                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group id="password" className="mb-4">
                                        <Form.Label>Your Password</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUnlockAlt}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                type="password"
                                                placeholder="Password"
                                                name="password"

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
                                                name="confirmPassword"

                                            />
                                        </InputGroup>

                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Sign up
                                    </Button>
                                </Form>

                                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Already have an account?
                    <Card.Link
                        as={Link}
                        to={Routes.Login.path}
                        className="fw-bold"
                    >
                      {` Login here `}
                    </Card.Link>
                  </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
};

export default Register;
