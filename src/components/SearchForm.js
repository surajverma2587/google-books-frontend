import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const SearchForm = ({ onSubmit, onChange, searchTerm, loading }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="searchTerm">
        <Form.Control
          type="text"
          placeholder="Enter book name"
          value={searchTerm}
          onChange={onChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {loading ? "Loading..." : "Submit"}
      </Button>
    </Form>
  );
};
