import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import SideBarButton from "./components/Button";
import {
  AiOutlineAppstore,
  AiOutlineRocket,
  MdOutlineArticle,
} from "react-icons/all";
import { gql, useQuery } from "@apollo/client";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";
import Button from "../Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  border-radius: 10px;
  background: white;
  min-height: 100vh;
  width: auto;
  flex: 1;
`;

const Wrapper = styled.div``;

export const SideBarItem = styled.div`
  flex: 1;
  border-radius: 5px;
  padding: 10px 15px;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: ${(props) => props.theme.mainColor};

  &:after {
    content: "Applify";
  }
`;

const HeadSection = styled.div`
  flex: 2;
  align-items: center;
  text-align: center;
`;

const NavSection = styled.div`
  flex: 5;
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  flex: 2;
`;

const AfterButtonCounter = styled.div`
  display: flex;
  color: white;
  border-radius: 12px;
  background: ${(props) => props.theme.mainColor};
  font-size: 14px;
  padding: 5px 5px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Subtitle = styled.div`
  font-size: 12px;
  line-height: 1.2;

  &:after {
    content: "Лучший портал для пользователей macOs";
  }
`;

function SideBar({ children }: PropsWithChildren<any>) {
  const { data, error, loading } = useQuery(gql`
    query GetCategories {
      categories {
        name
        alt_name
        postsCount
        __typename
      }
    }
  `);

  const renderItem = (category: {
    id: string;
    name: string;
    alt_name: "apps" | "games";
    postsCount: number;
  }) => {
    let icon = null;

    switch (category.alt_name) {
      case "apps":
        icon = <AiOutlineAppstore size={26} color={"#D9D9D9"} />;
        break;
      case "games":
        icon = <AiOutlineRocket size={26} color={"#D9D9D9"} />;
        break;
    }

    return (
      <Link
        to={{
          pathname: `/${category.alt_name}`,
        }}
        // state={{  }}
        key={category.id}
      >
        <SideBarButton
          before={icon}
          after={<AfterButtonCounter>{category.postsCount}</AfterButtonCounter>}
          title={category.name}
          key={category.id}
        />
      </Link>
    );
  };

  const Loader = (
    <ContentLoader
      speed={2}
      width={"100%"}
      height={"100%"}
      // viewBox="0 0 476 124"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="5" y="15" rx="3" ry="3" width="200" height="45" />
      <rect x="4" y="70" rx="3" ry="3" width="200" height="45" />
      <rect x="6" y="125" rx="3" ry="3" width="200" height="45" />
      <rect x="6" y="125" rx="3" ry="3" width="200" height="45" />
    </ContentLoader>
  );

  return (
    <Container>
      <HeadSection>
        <SideBarItem>
          <Title />
          <Subtitle />
        </SideBarItem>
      </HeadSection>
      <NavSection>
        {loading || error || (!loading && data.categories.length === 0)
          ? Loader
          : data.categories.map(renderItem)}
      </NavSection>
      <BottomSection>
        <Button>Поддержать проект</Button>
      </BottomSection>
    </Container>
  );
}

export default SideBar;
