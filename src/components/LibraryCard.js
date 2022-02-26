import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export const LibraryCard = ({ id, name, bookCount }) => {
  const navigate = useNavigate();

  return (
    <Card style={{ width: "18rem" }} className="m-3">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {bookCount} books
        </Card.Subtitle>
        <Stack gap={3} className="text-center">
          <Button
            onClick={() => {
              navigate(`/libraries/${id}`, { replace: true });
            }}
          >
            View Books
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};
