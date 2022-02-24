import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";

import { SearchForm } from "../components/SearchForm";

const SEARCH = gql`
  query Search($searchTerm: String!) {
    search(searchTerm: $searchTerm) {
      title
      authors
      pageCount
      imageUrl
      publishDate
      categories
      rating
      previewUrl
      description
    }
  }
`;

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [executeSearch, { called, loading, data, error }] = useLazyQuery(
    SEARCH,
    {
      variables: {
        searchTerm,
      },
    }
  );

  const onSubmit = (event) => {
    event.preventDefault();

    executeSearch();
    setSearchTerm("");
  };

  const onChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={12} md={12} lg={12} className="text-center p-4 my-4">
          <SearchForm
            onSubmit={onSubmit}
            onChange={onChange}
            searchTerm={searchTerm}
            loading={loading}
          />
        </Col>
        {data && (
          <Col sm={12} md={12} lg={12}>
            Books
          </Col>
        )}
      </Row>
    </Container>
  );
};
