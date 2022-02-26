import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export const AddLibraryModal = ({
  show,
  onClose,
  onAddLibrary,
  libraryName,
  onChangeLibraryName,
}) => {
  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Library</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Library Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter library name"
                value={libraryName}
                onChange={onChangeLibraryName}
              />
            </Form.Group>
            <Button onClick={onAddLibrary} type="submit">
              Create Library
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
