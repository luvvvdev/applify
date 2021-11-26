import React from "react";
import { useParams } from "react-router-dom";
import SectionBody from "../components/SectionBody";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import PostBox from "../components/PostBox";
import InfoBox from "../components/InfoBox";
import ContentLoader from "react-content-loader";
import Button from "../components/Button";
import getAssetUrl from "../lib/utils/getAssetUrl";
import format from "date-fns/format";

const Body = styled(SectionBody)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Hat = styled.div<{ posterUrl?: string }>`
  display: flex;
  flex: 3;
  background: whitesmoke;
  border-radius: 10px;
  padding: 15px 25px;
  flex-direction: column;
  background: no-repeat center url("${(props) => props.posterUrl}");
`;

const HatHeader = styled.div`
  display: flex;
  flex: 1;
`;

const HatFooter = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  flex-direction: column;
  padding: 10px 0px;
`;

const PublicationDate = styled.div`
  font-size: 12px;
`;

const PublicationTitle = styled.div`
  font-size: 30px;
  color: white;
  font-weight: 900;
`;

const PublicationDeveloper = styled.div`
  color: white;
  opacity: 0.5;
`;

const TagsRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  gap: 10px;
`;

const Tag = styled.div<{ name: string }>`
  padding: 5px;
  background: white;
  font-size: 12px;
  border-radius: 10px;
  opacity: 0.7;

  &:after {
    content: "${(props) => props.name}";
  }
`;

const Main = styled.div`
  flex: 3;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Bottom = styled.div`
  flex: 2;
`;

const PostDescription = styled.div`
  font-size: 14px;
`;

const MainRight = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex: 2;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 5px;
`;

const ButtonsRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  gap: 10px;
`;

const DownloadButton = styled(Button)`
  padding: 0px 15px;
  height: 40px;
`;

type TPost = {
  activation: {
    name: string;
  };
  author: {
    name: string;
  };
  compatibility: {
    name: string;
  };
  description: string;
  developer: {
    name: string;
  };
  downloadUrl: string;
  image: {
    url: string;
  };
  poster: {
    url: string;
  };
  tags: { name: string; id?: string }[];
  title: string;
  version: string;
  website: string;
  uiLanguage: string;
  size: string;
  architecture: {
    name: string;
  };
  publishDate: string;
};

function Post() {
  const params = useParams();

  const { loading, error, data } = useQuery(gql`
      query GetPostById {
          post(where: {
              id: "${params.post_id}"
          }) {
              id
              title
              content {
                  document
              }
              developer {
                  name
              }
              description
              downloadUrl
              activation {
                  name
              }
              image {
                  url
              }
              poster {
                  url
              }
              screenshots {
                  url
              }
              publishDate
              version
              website
              uiLanguage
              publishDate
              size
              architecture {
                  name
              }
              compatibility {
                  name
              }
              tags {
                  name
              }
              author {
                  name
              }
          }
      }
  `);

  const Loader = (
    <ContentLoader
      speed={2}
      width={500}
      height={500}
      viewBox="0 0 500 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="5" y="0" rx="3" ry="3" width="490" height="87" />
      <rect x="259" y="108" rx="3" ry="3" width="238" height="45" />
      <rect x="4" y="214" rx="3" ry="3" width="495" height="45" />
      <rect x="3" y="106" rx="3" ry="3" width="250" height="100" />
      <rect x="261" y="161" rx="3" ry="3" width="240" height="45" />
    </ContentLoader>
  );

  if (loading || error) {
    return Loader;
  }

  const post: TPost = data.post;

  const handleDownload = () => {
    if (window) {
      window!.open(post.downloadUrl, "_blank");
    }
  };

  return (
    <Body>
      <Hat posterUrl={getAssetUrl(post.poster.url)}>
        <HatHeader>
          <PublicationDate>
            {format(Date.parse(post.publishDate), "HH:mm dd/MM/YYY")}
          </PublicationDate>
        </HatHeader>
        <HatFooter>
          <PublicationDeveloper>{post.developer.name}</PublicationDeveloper>
          <PublicationTitle>{post.title}</PublicationTitle>
          <TagsRow>
            {post.tags.map((tag) => (
              <Tag name={tag.name} />
            ))}
          </TagsRow>
        </HatFooter>
      </Hat>
      <Main>
        <MainRight>
          <PostBox title={"Информация"}>
            <InfoRow>
              <InfoColumn>
                <InfoBox title={"Версия"} data={post.version} />
                <InfoBox title={"Активация"} data={post.activation.name} />
              </InfoColumn>
              <InfoColumn>
                <InfoBox title={"Размер"} data={post.size} />
                <InfoBox title={"Язык"} data={post.uiLanguage} />
              </InfoColumn>
              <InfoColumn>
                <InfoBox title={"Архитектура"} data={post.architecture.name} />
                <InfoBox
                  title={"Совместимость"}
                  data={post.compatibility.name}
                />
              </InfoColumn>
            </InfoRow>
          </PostBox>
          <PostBox
            title={"Ссылки на скачивание"}
            subtitle={"Все файлы проверены на безопасность"}
          >
            <ButtonsRow>
              <DownloadButton onClick={handleDownload}>
                Скачать с сервера
              </DownloadButton>
              {
                //<Button>Скачать с Яндекс Диск</Button>
              }
            </ButtonsRow>
          </PostBox>
        </MainRight>
        <PostBox title={"Описание"}>
          <PostDescription>
            Sketch - это инструмент для векторного дизайна для Mac с акцентом на
            дизайн экрана. Он используется главным образом дизайнерами экрана,
            которые создают веб-сайты, значки и пользовательские интерфейсы для
            настольных и мобильных устройств. Мощные и простые в использовании
            инструменты Sketch для начинающих и профессионалов отрасли позволяют
            дизайнерам сосредоточиться на том, что они делают лучше всего;
            дизайн.{"\n \n"}С его концепции Sketch был адаптирован к
            потребностям цифровых дизайнеров, и это проявляется в каждом волокне
            приложения. С тех пор популярность Sketch и его фан-база
          </PostDescription>
        </PostBox>
      </Main>
      {/*<Bottom>d</Bottom>*/}
    </Body>
  );
}

export default Post;
