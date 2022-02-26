import { gql, useMutation, useQuery } from "@apollo/client";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { LibraryCard } from "../components/LibraryCard";
import { useState } from "react";
import { AddLibraryModal } from "../components/AddLibraryModal";

const LIBRARIES = gql`
  query Libraries {
    libraries {
      id
      name
      bookCount
    }
  }
`;

const ADD_LIBRARY = gql`
  mutation AddLibrary($library: LibraryInput!) {
    addLibrary(library: $library) {
      name
    }
  }
`;

export const Libraries = () => {
  const [showAddLibraryModal, setAddLibraryModal] = useState(false);
  const [libraryName, setLibraryName] = useState("");
  const [executeAddLibrary, addLibrary] = useMutation(ADD_LIBRARY);

  const libraries = useQuery(LIBRARIES);

  const onModalClose = () => {
    setAddLibraryModal(false);
    setLibraryName("");
  };

  const onChangeLibraryName = (event) => {
    setLibraryName(event.target.value);
  };

  const onAddLibrary = async (event) => {
    event.preventDefault();

    await executeAddLibrary({
      variables: {
        library: {
          name: libraryName,
        },
      },
    });

    libraries.refetch();

    onModalClose();
  };

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
        {!libraries.loading && (
          <Col
            sm={12}
            md={12}
            lg={12}
            className="d-flex flex-direction-row flex-wrap justify-content-center"
          >
            <Button
              onClick={() => {
                setAddLibraryModal(true);
              }}
            >
              Add New Library
            </Button>
          </Col>
        )}
        {!libraries.loading && showAddLibraryModal && (
          <AddLibraryModal
            show={showAddLibraryModal}
            onClose={onModalClose}
            onAddLibrary={onAddLibrary}
            libraryName={libraryName}
            onChangeLibraryName={onChangeLibraryName}
          />
        )}
        {libraries?.data?.libraries && (
          <Col
            sm={12}
            md={12}
            lg={12}
            className="d-flex flex-direction-row flex-wrap justify-content-center"
          >
            {libraries?.data?.libraries.map((library) => {
              return <LibraryCard {...library} key={library.id} />;
            })}
          </Col>
        )}
      </Stack>
    </Container>
  );
};
