import React, { useContext } from "react";

type SearchContextType = {
  query: string;
  setQuery?: (newQuery: string) => void;
  clear?: () => void;
};

const initialState: SearchContextType = {
  query: "",
};

const SearchContext = React.createContext(initialState);

const SearchProvider = SearchContext.Provider;

const useSearch = () => {
  const searchContext = useContext(SearchContext);

  return { ...searchContext };
};

export { SearchProvider, useSearch };
