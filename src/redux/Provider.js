import React from "react";
import { store } from "./store";
import { Provider } from "react-redux";

function ProviderApp({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default ProviderApp;
