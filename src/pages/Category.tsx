import React from "react";
import SectionItem from "../components/SectionItem";
import styled from "styled-components";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import ContentLoader from "react-content-loader";
import config from "../config";
import SectionBody from "../components/SectionBody";

const SectionHeader = styled.div`
  display: flex;
  flex: 1;
`;

const SectionTitle = styled.div`
  font-size: 26px;
  font-weight: bold;
`;

const CategoryBody = styled(SectionBody)`
  grid-gap: 32px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  flex: 10;

  @media screen and (min-width: 710px) and (max-width: 1210px) {
    grid-template-columns: repeat(2, 1fr) !important;
  }

  @media screen and (max-width: 710px) {
    grid-gap: 16px;
    grid-template-columns: repeat(1, 1fr) !important;
  }
`;

function Category() {
  const params = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("search") || "";

  const {
    data: categoriesData,
    error: categoriesError,
    loading: categoriesLoading,
  } = useQuery(gql`
    query GetCategories {
      categories {
        name
        alt_name
        __typename
      }
    }
  `);

  const { data, error, loading } = useQuery(gql`
      query GetPostsByCategory {
          posts(where: {
              category: {
                  alt_name: {
                      equals: "${params.category}"
                  }
              }
                ${
                  query || query.length > 0
                    ? `title: {
                  contains: "${query}"
              }`
                    : ""
                }
          }) {
              id
              developer {
                  name
              }
              icon {
                  url
              }
              version
              title
              altTitle {
                  name
              }
          }
      }
  `);

  const Loader = (
    <ContentLoader
      speed={2}
      width={476}
      height={124}
      viewBox="0 0 476 124"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="5" y="0" rx="3" ry="3" width="250" height="45" />
      <rect x="266" y="-1" rx="3" ry="3" width="250" height="45" />
      <rect x="6" y="125" rx="3" ry="3" width="250" height="45" />
      <rect x="6" y="53" rx="3" ry="3" width="250" height="45" />
      <rect x="266" y="51" rx="3" ry="3" width="250" height="45" />
    </ContentLoader>
  );

  const renderItem = (data: {
    id: string;
    altTitle: { name: string };
    title: string;
    icon: { url: string };
    version: string;
  }) => (
    <Link
      to={{
        pathname: `${location.pathname}/${data.id}`,
      }}
      key={data.id}
    >
      <SectionItem
        title={data.title}
        altName={data.altTitle.name}
        imgUrl={config.ASSETS_URL + data.icon.url}
        version={data.version}
      />
    </Link>
  );

  const getCategoryName = () => {
    if (!categoriesLoading && !categoriesError) {
      return categoriesData.categories.find(
        (v: any) => v.alt_name == params.category
      )?.name;
    }

    return null;
  };

  return (
    <>
      <SectionHeader>
        <SectionTitle>{getCategoryName()}</SectionTitle>
      </SectionHeader>
      <CategoryBody>
        {loading || categoriesLoading || error
          ? Loader
          : data.posts.map(renderItem)}
      </CategoryBody>
    </>
  );
}

export default Category;
