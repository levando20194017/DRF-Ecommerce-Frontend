import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { Card, Image, Form } from "@themesberg/react-bootstrap";
import Select from "react-select";

export const ChoosePhotoWidget = (props) => {
  const { title, photo } = props;

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <p className="mb-4">{title}</p>
        <div className="d-xl-flex align-items-center">
          <div className="user-avatar xl-avatar">
            <Image fluid rounded src={photo} />
          </div>
          <div className="file-field">
            <div className="d-flex justify-content-xl-center ms-xl-3">
              <div className="d-flex">
                <span className="icon icon-md">
                  <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                </span>
                <input type="file" />
                <div className="d-md-block text-start">
                  <div className="fw-normal text-dark mb-1">Choose Image</div>
                  <div className="text-gray small">
                    JPG, GIF or PNG. Max size of 3MB
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export const ChooseStatusWidget = (props) => {
  const { title } = props;
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <p className="mb-4">{title}</p>
        <div>
          <Form.Group id="status">
            <Form.Select defaultValue="0">
              <option value="0">Published</option>
              <option value="1">Draft</option>
              <option value="2">Pending</option>
            </Form.Select>
          </Form.Group>
        </div>
      </Card.Body>
    </Card>
  );
};

export const ChooseTagWidget = (props) => {
  const { title, formBlogData, optionsTag, handleTagChange, selectedTags } =
    props;

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <p className="mb-4">
          {title} <span className="text-danger">*</span>
        </p>
        <div>
          <Select
            defaultValue={optionsTag[0]}
            isMulti
            name="colors"
            options={optionsTag}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleTagChange}
            value={selectedTags}
          />
        </div>
        {formBlogData.tagIdsError && (
          <div className="text-danger">{formBlogData.tagIdsError}</div>
        )}
      </Card.Body>
    </Card>
  );
};
