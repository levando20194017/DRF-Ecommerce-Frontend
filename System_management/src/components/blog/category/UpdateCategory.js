import React, {useEffect, useState} from "react";
import {Col, Row, Card, Form, Button} from '@themesberg/react-bootstrap';
import {TinyMce} from "../../product/catalog/TinyMce";

export const UpdateCategory = (props) => {
    const {category, handleUpdateCategory} = props
    const [error, setError] = useState('')
    const [form, setForm] = useState({
        name: "",
        description: "",
        imageUrl: ""
    })

    useEffect(() => {
        setForm({...form, name: category?.name, description: category?.description, imageUrl: category?.imageUrl})
    }, [category]);
    const handleInput = (e) => {
        setError('')
        const {name, value} = e.target
        const newForm = {...form, [name]: value}
        setForm(newForm)
    }
    const validateInput = () => {
        if (form.name === '') {
            setError('Required')
        }
    }

    const handleChangeEditor = (value) => {
        const newForm = Object.assign(form)
        newForm.description = value
        setForm(newForm)
    }

    const handleSubmit = () => {
        validateInput()
        handleUpdateCategory(form, category?.id,)
    }

    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <Form>
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group id="category_name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    name="name"
                                    required type="text"
                                    maxLength={100}
                                    value={form.name}
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
                                data={form?.description}
                            />
                        </Col>
                    </Row>
                    <div className="mt-3">
                        <Button
                            variant="primary"
                            onClick={() => handleSubmit()}
                        >Edit Category</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};
