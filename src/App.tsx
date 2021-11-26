import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "./lib/theme";
import Category from "./pages/Category";
import client, { useClient } from "./lib/client";
import { ApolloProvider } from "@apollo/client";
import Post from "./pages/Post";

import { SearchProvider } from "./lib/searchContext";
import GlobalStyle from "./components/GlobalStyle";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path={"/"} element={<Main />}>
              <Route path={":category"} element={<Category />} />
              <Route path={":category/:post_id"} element={<Post />} />
            </Route>
          </Routes>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
