import { useState } from "react";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

import { SearchForm } from "../components/SearchForm";
import { BookCard } from "../components/BookCard";
import { AddToLibraryModal } from "../components/AddToLibraryModal";

const SEARCH = gql`
  query Search($searchTerm: String!) {
    search(searchTerm: $searchTerm) {
      id
      title
      authors
      imageUrl
      pageCount
      publishDate
      categories
      rating
      previewUrl
      description
    }
  }
`;

const LIBRARIES = gql`
  query Libraries {
    libraries {
      id
      name
      bookCount
    }
  }
`;

const ADD_BOOK_TO_LIBRARY = gql`
  mutation AddBookToLibrary($book: BookInput!, $libraryId: ID!) {
    addBookToLibrary(book: $book, libraryId: $libraryId) {
      id
      name
      bookCount
    }
  }
`;

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddToLibraryModal, setAddToLibraryModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState();
  const [selectedLibrary, setSelectedLibrary] = useState();

  const libraries = useQuery(LIBRARIES);

  const [executeSearch, search] = useLazyQuery(SEARCH);

  const [executeAddBookToLibrary, addBookToLibrary] =
    useMutation(ADD_BOOK_TO_LIBRARY);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (searchTerm) {
      await executeSearch({
        variables: {
          searchTerm,
        },
      });
    }

    setSearchTerm("");
  };

  const onChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const onAddToLibrary = (event) => {
    const bookId = event.target.id;
    const book = search?.data?.search?.find((each) => {
      return each.id === bookId;
    });
    setSelectedBook(book);
    setAddToLibraryModal(true);
  };

  const onModalClose = () => {
    setSelectedBook();
    setSelectedLibrary();
    setAddToLibraryModal(false);
  };

  const onAddBook = async (event) => {
    event.preventDefault();

    const { __typename, ...rest } = selectedBook;

    await executeAddBookToLibrary({
      variables: {
        book: rest,
        libraryId: selectedLibrary,
      },
    });

    onModalClose();
  };

  const onSelectLibrary = (event) => {
    const libraryId = event.target.value;
    setSelectedLibrary(libraryId);
  };

  return (
    <Container fluid>
      {libraries.loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!libraries.loading && libraries.data && (
        <Row>
          {showAddToLibraryModal && (
            <AddToLibraryModal
              show={showAddToLibraryModal}
              onClose={onModalClose}
              libraries={libraries.data.libraries}
              onAddBook={onAddBook}
              onSelectLibrary={onSelectLibrary}
            />
          )}
          <Col sm={12} md={12} lg={12} className="text-center p-4 my-4">
            <SearchForm
              onSubmit={onSubmit}
              onChange={onChange}
              searchTerm={searchTerm}
              loading={search.loading}
            />
          </Col>
          {search.data?.search && (
            <Col
              sm={12}
              md={12}
              lg={12}
              className="d-flex flex-direction-row flex-wrap justify-content-center"
            >
              {search.data?.search?.map((book) => {
                return (
                  <BookCard
                    key={book.id}
                    {...book}
                    onAddToLibrary={onAddToLibrary}
                  />
                );
              })}
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};
