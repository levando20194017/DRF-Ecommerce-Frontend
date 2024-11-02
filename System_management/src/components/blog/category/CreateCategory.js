import React, { useEffect, useState } from "react";
import { Col, Row, Card, Form, Button } from '@themesberg/react-bootstrap';
import { TinyMce } from "../../product/catalog/TinyMce";

export const CreateCategory = (props) => {
    const { handleCreateCategory } = props
    const [error, setError] = useState('')
    const [form, setForm] = useState({
        name: "",
        description: "",
    })
    const handleInput = (e) => {
        setError('')
        const { name, value } = e.target
        const newForm = { ...form, [name]: value }
        setForm(newForm)
    }
    const validateInput = () => {
        if (form.name === '') {
            setError('Category Name is required')
        }
    }

    const handleChangeEditor = (value) => {
        setForm({ ...form, description: value })
    }

    const handleSubmit = () => {
        validateInput()
        handleCreateCategory(form)
    }

    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <Form>
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group id="category_name">
                                <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    name="name"
                                    required
                                    maxLength={100}
                                    type="text"
                                    placeholder="Enter Category Name"
                                    onChange={(e) => handleInput(e)}
                                />
                                {
                                    error ? (<div className="text-danger">{error}</div>) : <></>
                                }
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Label>Description</Form.Label>
                    <Row>
                        <Col sm={12} className="mb-3">
                            <TinyMce
                                handleChangeEditor={handleChangeEditor}
                            />
                        </Col>
                    </Row>
                    <div className="mt-3">
                        <Button
                            variant="primary"
                            onClick={() => handleSubmit()}
                        >Create Category</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};
