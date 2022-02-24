import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

export const BookCard = ({
  id,
  title,
  description,
  imageUrl,
  authors,
  previewUrl,
  onAddToLibrary,
}) => {
  return (
    <Card style={{ width: "18rem" }} className="m-3">
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>{authors.join(" | ")}</Card.Subtitle>
        {description && <Card.Text>{description}</Card.Text>}
        <Stack gap={3} className="text-center">
          <Card.Link href={previewUrl} target="_blank">
            Preview
          </Card.Link>
          <Button id={id} onClick={onAddToLibrary} variant="primary">
            Add to Library
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};
