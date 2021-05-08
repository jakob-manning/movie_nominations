import React from 'react';
import './App.css';
import MovieSearch from "./Movies/Containers/MovieSearch";
import {ChakraProvider} from "@chakra-ui/react"

function App() {
  return (
    <div className="App">
        <ChakraProvider>
            <MovieSearch />
        </ChakraProvider>
    </div>
  );
}

export default App;
