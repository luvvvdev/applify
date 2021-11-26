import styled from "styled-components";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

const PageBody = styled.div`
  flex: 1;
  flex-basis: 100%;
  flex-direction: row;
  display: flex;
  padding: 0 0px;
`;

const PageContent = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  padding: 14px 20px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  flex: 10;
`;

const Main = () => (
  <PageBody>
    <SideBar />
    <PageContent>
      <Header />
      <Section>
        <Outlet />
      </Section>
    </PageContent>
  </PageBody>
);

export default Main;
