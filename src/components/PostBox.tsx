import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const Container = styled.div<{ priority: number }>`
  background: whitesmoke;
  padding: 10px 15px;
  flex: ${(props) => props.priority};
  display: flex;
  flex-direction: column;
  border-radius: 15px;
`;

const ContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;
const ContainerContent = styled.div`
  display: flex;
  flex: 6;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Subtitle = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.textSecondary};
`;

type PostBoxProps = {
  priority?: number;
  title: string;
  subtitle?: string;
};

function PostBox({
  priority = 1,
  title,
  children,
  subtitle,
}: PropsWithChildren<PostBoxProps>) {
  return (
    <Container priority={priority}>
      <ContainerHeader>
        <TitleContainer>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </TitleContainer>
      </ContainerHeader>
      <ContainerContent>{children}</ContainerContent>
    </Container>
  );
}

export default PostBox;
