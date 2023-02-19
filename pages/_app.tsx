import React from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { globalStyles } from "../global";

export default function IndexPage({ Component, pageProps }: any) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        {globalStyles}
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}
