import { FC } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import TopRouter from "./route/index";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter basename="/assistance-system">
        <CommonLayout />
      </BrowserRouter>
    </ChakraProvider>
  );
}

const CommonLayout: FC = () => {
  return <TopRouter />;
};

export default App;
