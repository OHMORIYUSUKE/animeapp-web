import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DetailPage } from "./pages/anime";
import { TopPage } from "./pages";
import { Error404Page } from "./pages/404";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<TopPage />} />
          <Route path={`/anime/:name`} element={<DetailPage />} />
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
