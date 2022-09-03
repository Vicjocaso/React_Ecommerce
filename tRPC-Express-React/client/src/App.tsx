import React, { useState } from "react";
import ReactDOM from "react-dom";
import { QueryClientProvider } from "react-query";
import { trpc } from "./utils/trpc";
import { Test, client } from "./test";
import { TestCounter } from "./testConuter";
import { Provider } from "react-redux";
import { store } from "./app/store";

import "reflect-metadata";
import "./index.scss";

const App = () => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:8080/trpc",
    })
  );
  return (
    <Provider store={store}>
      <trpc.Provider client={trpcClient} queryClient={client}>
        <QueryClientProvider client={client}>
          <Test />
          <TestCounter />
        </QueryClientProvider>
      </trpc.Provider>
    </Provider>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
