import { gql, useQuery } from "@apollo/client";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Spinner from "react-bootstrap/Spinner";

const LIBRARIES = gql`
  query Libraries {
    libraries {
      id
      name
      bookCount
    }
  }
`;

export const Libraries = () => {
  const libraries = useQuery(LIBRARIES);

  return (
    <Container fluid>
      <Stack gap={5} className="text-center mt-5">
        <h1>My Libraries</h1>
        <hr />
        {libraries.loading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {libraries?.data?.libraries && <div>TODO</div>}
      </Stack>
    </Container>
  );
};
