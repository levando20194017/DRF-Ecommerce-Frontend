import React from "react";
import { Container, Form, InputGroup } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ProductSearch = ({ setSearchName, searchName }) => {
  return (
    <>
      <Container fluid className="px-0 pb-3">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <Form className="navbar-search">
              <Form.Group id="topbarSearch">
                <InputGroup className="input-group-merge search-bar">
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faSearch} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="merchantReference"
                    placeholder="Search"
                    value={searchName}
                    onChange={(e) => {
                      setSearchName(e.target.value);
                    }}
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};
export default ProductSearch;
