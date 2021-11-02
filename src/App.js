import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import GlobalStyles from './styles/global';

import { PostProvider } from './hooks/posts';

import { News } from "./components/News/News";
import { Header } from "./components/Header/header";

function App() {
  return (
    <PostProvider>
    <ChakraProvider>
      <GlobalStyles />
      <Header />
      <News />
    </ChakraProvider>
    </PostProvider>
  );
}

export default App;
