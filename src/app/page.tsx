"use client";
import Body from "./body";
import { QueryClient, QueryClientProvider } from "react-query";
import DatadogInit from "./datadog-init";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex min-h-screen flex-col items-center justify-between">
      <DatadogInit />
        <Body />
      </main>
    </QueryClientProvider>
  );
}
