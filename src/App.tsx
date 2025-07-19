import React, { FC } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import TopRouter from "./route/index";
import store from "./store/index";

function App() {
  return (
    <ChakraProvider>
      {/* <Provider store={store}> */}
      <BrowserRouter basename="/assistance-system">
        <CommonLayout />
      </BrowserRouter>
      {/* </Provider> */}
    </ChakraProvider>
  );
}

const CommonLayout: FC = () => {
  return <TopRouter />;
};

export default App;
