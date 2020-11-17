import * as React from "react";
import { renderRoutes } from "react-router-config";

const Home = (props) => (
  <>{renderRoutes(props.route.routes, { matchPath: props.route.path })}</>
);

export default Home;
