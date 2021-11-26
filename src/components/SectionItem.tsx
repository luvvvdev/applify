import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  margin: 8px 0;
  position: relative;
  text-decoration: none !important;
  z-index: 101;
  height: min-content;
  background: whitesmoke;
  padding: 10px;
  border-radius: 10px;

  cursor: pointer;
  transition: 0.5s;
  &:hover {
    opacity: 0.5;
  }
`;

const SectionItemContainer = styled.div`
  -webkit-box-align: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
`;

const SectionItemContainerCounter = styled.div`
  cursor: pointer;
  height: fit-content;
  margin-left: auto;
  margin-top: 5px;
  pointer-events: none;
  position: absolute;
  right: 15px;
  white-space: nowrap;
  color: white;
  padding: 5px;
  font-size: 12px;
  border-radius: 10px;
  background: ${(props) => props.theme.mainColor};
`;

const SectionItemContainerText = styled.div`
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
`;

const SectionItemContainerTitle = styled.div`
  font-weight: bold;
  font-size: 15px;
`;

const SectionItemContainerDescription = styled.span`
  font-size: 12px;
`;

const SectionItemImage = styled.img`
  margin-right: 10px;
  width: 56px;
  height: 56px;
`;

type SectionItemProps = {
  id?: string;
  title: string;
  altName: string;
  imgUrl?: string;
  version?: string;
};

function SectionItem({ title, altName, imgUrl, version }: SectionItemProps) {
  return (
    <Container>
      <SectionItemContainer>
        <SectionItemImage src={imgUrl} />
        <SectionItemContainerText>
          <SectionItemContainerTitle>{title}</SectionItemContainerTitle>
          <SectionItemContainerDescription>
            {altName}
          </SectionItemContainerDescription>
        </SectionItemContainerText>
      </SectionItemContainer>
      <SectionItemContainerCounter>{version}</SectionItemContainerCounter>
    </Container>
  );
}

export default SectionItem;
