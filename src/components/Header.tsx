import styled from "styled-components";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useSearch } from "../lib/searchContext";
import { ChangeEvent } from "react";
import debounce from "../lib/utils/debounce";

const HeaderContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const SearchInput = styled.input`
  height: 40px;
  width: 100%;
  padding: 10px 15px;
  border-radius: 15px;
  transition: 0.2s;
  background: whitesmoke;
  outline: black;
`;

type HeaderSectionProps = {
  priority?: number;
};

const HeaderSection = styled.div<HeaderSectionProps>`
  flex: ${(props) => props.priority || 1};
`;

function Header() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  if (location.pathname.match(/\/[a-z]+\/[a-z0-9]+/)) {
    return null;
  }

  const handleQueryChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ search: ev.target.value });
  };

  const debounced = debounce(handleQueryChange, 500);

  return (
    <HeaderContainer>
      <HeaderSection priority={3}>
        <SearchInput
          placeholder={"Search"}
          height={"80px"}
          value={searchParams.get("search") || ""}
          onChange={debounced}
        />
      </HeaderSection>
    </HeaderContainer>
  );
}

export default Header;
