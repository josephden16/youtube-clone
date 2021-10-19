import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Base from "./components/base";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Base />
    </QueryClientProvider>
  );
}

export default App;
