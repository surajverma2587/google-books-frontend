import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export const AddToLibraryModal = ({
  show,
  onClose,
  libraries,
  onAddBook,
  onSelectLibrary,
}) => {
  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Library</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">
                Please select a library
              </Form.Label>
              <Form.Select
                onChange={onSelectLibrary}
                id="disabledSelect"
                defaultValue=""
              >
                <option disabled value="">
                  Please select
                </option>
                {libraries.map((library) => {
                  return (
                    <option key={library.id} value={library.id}>
                      {library.name} | [{library.bookCount} books]
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Button onClick={onAddBook} type="submit">
              Add Book
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
