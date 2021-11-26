import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 13px;
`;

const Title = styled.div``;

const Data = styled.div`
  font-weight: 600;
`;

type InfoBoxProps = {
  title: string;
  data: string;
};

function InfoBox({ title, data }: InfoBoxProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Data>{data}</Data>
    </Container>
  );
}

export default InfoBox;
