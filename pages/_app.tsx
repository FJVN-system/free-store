import { NextPage } from "next";
import { globalStyles } from "../global";
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from "react";

const IndexPage: NextPage<any> = ({ Component, pageProps }: any) => {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        {globalStyles}
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default IndexPage;
