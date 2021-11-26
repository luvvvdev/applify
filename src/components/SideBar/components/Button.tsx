import React from "react";
import styled from "styled-components";
import { SideBarItem } from "../index";
import { ReactNode } from "react";

const Container = styled.div`
  display: flex;
  background: white;
  border-radius: 6px;
  padding: 15px 10px;
  flex: initial;
  cursor: pointer;
  transition: 0.5s;
  background: ${(props) => props.theme.secondaryColor};
  align-items: center;

  &:hover {
    transition: 0.1s;
    opacity: 0.5;
  }
`;

const Title = styled.div`
  flex: 6;
  font-size: 14px;
  font-weight: bold;
`;

const Before = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1.5;
`;

const After = styled.div`
  flex: 1.5;
`;

type SideBarButtonProps = {
  before?: ReactNode;
  title: string;
  after?: ReactNode;
};

function SideBarButton({ before, after, title }: SideBarButtonProps) {
  return (
    <Container>
      <Before>{before}</Before>
      <Title>{title}</Title>
      <After>{after}</After>
    </Container>
  );
}

export default SideBarButton;
