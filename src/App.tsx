import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DetailPage } from "./pages/anime";
import { TopPage } from "./pages";
import { Error404Page } from "./pages/404";
import { ChakraProvider } from "@chakra-ui/react";
import { Error500Page } from "./pages/500";

const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<TopPage />} />
          <Route path={"/anime"} element={<DetailPage />} />
          <Route path={"/500"} element={<Error500Page />} />
          <Route path={"*"} element={<Error404Page />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
