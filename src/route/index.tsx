import { type FunctionComponent, type FC } from "react";
import { Route, Routes } from "react-router-dom";
import { TopUriEnum } from "./const/routePath";
import Index from "../page/index";
import { Container } from "@chakra-ui/react";

type RouteMappingType = {
  path: string;
  element: FunctionComponent;
};

// ルートマッピングの定義
const RouteMapping: RouteMappingType[] = [
  {
    path: TopUriEnum.Top,
    element: Index,
  },
];

const TopRouter: FC = () => {
  return (
    <Container maxW={"full"}>
      <Routes>
        {RouteMapping.map((route: any, key: number) => (
          <Route
            key={key.toString()}
            path={route.path}
            element={<route.element />}
          />
        ))}
      </Routes>
    </Container>
  );
};

export default TopRouter;
