import React from "react";
import { Col, Row, Card, Image, Container } from "@themesberg/react-bootstrap";

import { Link } from "react-router-dom";

import { Routes } from "../../routes";
import NotFoundImage from "../../assets/img/illustrations/invalid.png";

export default () => {
  return (
    <main>
      <section className="vh-100 d-flex align-items-center justify-content-center">
        <Container>
          <Row>
            <Col
              xs={12}
              className="text-center d-flex align-items-center justify-content-center"
            >
              <div>
                <Card.Link as={Link} to={Routes.DashboardOverview.path}>
                  <Image src={NotFoundImage} className="img-fluid w-75" />
                </Card.Link>
                <h1 className="text-primary mt-5">Invalid Permission</h1>
                <p className="lead my-4">
                  Please contact the administrator to resolve the issue...
                </p>
                {/* <Button
                  as={Link}
                  variant="primary"
                  className="animate-hover"
                  to={Routes.DashboardOverview.path}
                >
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="animate-left-3 me-3 ms-2"
                  />
                  Go back home
                </Button> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
